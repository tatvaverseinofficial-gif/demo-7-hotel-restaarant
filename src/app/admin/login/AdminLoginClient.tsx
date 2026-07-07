"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Eye, EyeOff } from "lucide-react";

export default function AdminLoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        setError("Invalid username or password");
        return;
      }

      const from = searchParams.get("from") || "/admin";
      router.push(from);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center p-4">
      <div className="absolute inset-0 texture-overlay" />
      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full border border-champagne/30 flex items-center justify-center">
            <Lock className="text-champagne" size={24} />
          </div>
          <h1 className="text-2xl font-serif text-luxury-white">Admin Access</h1>
          <p className="text-warm-beige/50 text-sm mt-2">Authorized personnel only</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-charcoal-light border border-warm-beige/10 p-6 sm:p-8 space-y-5"
        >
          {error && (
            <p className="text-red-300 text-sm bg-red-900/20 border border-red-800/30 px-4 py-3">
              {error}
            </p>
          )}

          <div>
            <label htmlFor="username" className="block text-sm text-warm-beige/70 mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-charcoal border border-warm-beige/20 px-4 py-3.5 text-base text-luxury-white focus:outline-none focus:border-champagne min-h-[48px]"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-warm-beige/70 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-charcoal border border-warm-beige/20 px-4 py-3.5 pr-12 text-base text-luxury-white focus:outline-none focus:border-champagne min-h-[48px]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-beige/50 hover:text-champagne p-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 min-h-[48px] bg-champagne text-charcoal text-sm tracking-widest uppercase font-medium hover:bg-soft-gold transition-colors disabled:opacity-50 touch-manipulation"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
