/**
 * Local smoke test — reads credentials from .env.local (never log secrets).
 * Usage: node scripts/smoke-test.mjs [baseUrl]
 */
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const base = process.argv[2] || "http://localhost:3000";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function loadEnv() {
  const env = {};
  try {
    const lines = readFileSync(resolve(root, ".env.local"), "utf8").split("\n");
    for (const line of lines) {
      const t = line.trim();
      if (!t || t.startsWith("#")) continue;
      const i = t.indexOf("=");
      if (i === -1) continue;
      env[t.slice(0, i)] = t.slice(i + 1);
    }
  } catch {
    /* no .env.local */
  }
  return env;
}

const env = loadEnv();
const cookieJar = new Map();

async function request(path, { method = "GET", body, headers = {} } = {}) {
  const url = `${base}${path}`;
  const res = await fetch(url, {
    method,
    headers: {
      ...headers,
      ...(cookieJar.size ? { Cookie: [...cookieJar.entries()].map(([k, v]) => `${k}=${v}`).join("; ") } : {}),
    },
    body,
    redirect: "manual",
  });

  const setCookie = res.headers.getSetCookie?.() || [];
  for (const c of setCookie) {
    const [pair] = c.split(";");
    const [k, v] = pair.split("=");
    cookieJar.set(k, v);
  }

  return { status: res.status, location: res.headers.get("location"), ok: res.ok };
}

const publicRoutes = ["/", "/admin/login", "/robots.txt", "/sitemap.xml"];
const protectedRoutes = [
  "/admin",
  "/admin/rooms",
  "/admin/rooms/new",
  "/admin/restaurant",
  "/admin/restaurant/new",
  "/admin/gallery",
  "/admin/gallery/new",
  "/admin/amenities",
  "/admin/amenities/new",
  "/admin/experiences",
  "/admin/experiences/new",
  "/admin/testimonials",
  "/admin/testimonials/new",
  "/admin/homepage",
  "/admin/seo",
  "/admin/settings",
];

let failed = 0;

console.log("=== Public routes ===");
for (const path of publicRoutes) {
  const r = await request(path);
  const pass = r.status === 200;
  console.log(`${pass ? "OK" : "FAIL"} ${r.status} ${path}`);
  if (!pass) failed++;
}

console.log("\n=== Protected routes (unauthenticated → redirect) ===");
for (const path of protectedRoutes) {
  cookieJar.clear();
  const r = await request(path);
  const pass = r.status === 307 || r.status === 302;
  console.log(`${pass ? "OK" : "FAIL"} ${r.status} ${path}${r.location ? ` → ${r.location}` : ""}`);
  if (!pass) failed++;
}

if (env.ADMIN_USERNAME && env.ADMIN_PASSWORD) {
  console.log("\n=== Admin login + authenticated pages ===");
  const login = await request("/api/admin/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: env.ADMIN_USERNAME, password: env.ADMIN_PASSWORD }),
  });
  const loggedIn = login.status === 200;
  console.log(`${loggedIn ? "OK" : "FAIL"} ${login.status} POST /api/admin/auth/login`);
  if (!loggedIn) failed++;

  if (loggedIn) {
    for (const path of protectedRoutes) {
      const r = await request(path);
    const pass = path.endsWith("/new")
      ? r.status === 307 || r.status === 302 || r.status === 200
      : r.status === 200;
      console.log(`${pass ? "OK" : "FAIL"} ${r.status} ${path}`);
      if (!pass) failed++;
    }

    const apiGet = await request("/api/admin/rooms");
    console.log(`${apiGet.status === 200 ? "OK" : "FAIL"} ${apiGet.status} GET /api/admin/rooms`);

    const apiPost = await request("/api/admin/rooms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "smoke-test" }),
    });
    const demoBlocked = apiPost.status === 403;
    console.log(`${demoBlocked ? "OK" : "FAIL"} ${apiPost.status} POST /api/admin/rooms (expect 403 in demo)`);
  }
} else {
  console.log("\nSkipping auth tests — ADMIN_USERNAME/PASSWORD not in .env.local");
}

const contact = await fetch(`${base}/api/contact`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "Smoke Test",
    email: "test@example.com",
    phone: "9999999999",
    guests: 2,
    message: "Automated smoke test",
  }),
});
const contactJson = await contact.json();
console.log(`\n${contact.ok ? "OK" : "FAIL"} ${contact.status} POST /api/contact — ${contactJson.message || ""}`);

console.log(failed ? `\n${failed} check(s) failed` : "\nAll checks passed");
process.exit(failed ? 1 : 0);
