# Grand Imperial Palace

A premium Hotel & Restaurant showcase website for the Indian hospitality industry. Built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Premium Design** — Luxury hospitality aesthetic inspired by Taj, Oberoi, ITC, and Marriott
- **Full Homepage** — Hero, Rooms, Restaurant, Amenities, Experiences, Gallery, Testimonials, FAQ, Contact
- **Admin Panel** — Password-protected CMS with demo (view-only) and full edit modes
- **SEO Optimized** — Schema markup, Open Graph, Twitter Cards, sitemap, robots.txt
- **Mobile Responsive** — Mobile-first layout, sticky CTA, touch targets, safe areas
- **Animations** — Cinematic hero reveal, parallax, scroll animations
- **Supabase Ready** — Mock data with seamless production migration + image uploads

## Quick Start

```bash
# Install dependencies (Windows SSL fix if needed)
$env:NODE_OPTIONS="--use-system-ca"
npm install

# Copy env and set admin credentials (never commit .env.local)
cp .env.example .env.local

# Download hospitality images (optional — SVG fallbacks included)
npm run download-images

# Start development server
npm run dev
```

- **Website:** http://localhost:3000
- **Admin login:** http://localhost:3000/admin/login (not linked publicly)

## Admin Access

Set these in `.env.local` (server-only, never commit):

```env
ADMIN_USERNAME=your_admin_user
ADMIN_PASSWORD=your_strong_password
ADMIN_SESSION_SECRET=random-32-char-string
NEXT_PUBLIC_DEMO_MODE=true
```

| Mode | `NEXT_PUBLIC_DEMO_MODE` | Supabase | Behavior |
|------|-------------------------|----------|----------|
| Demo | `true` | optional | View admin, no edits/uploads |
| Production | `false` | required | Full CRUD + image uploads |

## Environment Variables

See `.env.example` for all variables.

## Supabase Migration

1. Create a Supabase project
2. Run `supabase/schema.sql` in the SQL editor (includes storage bucket notes)
3. Add Supabase env vars to `.env.local`
4. Set `NEXT_PUBLIC_DEMO_MODE=false` and restart

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run download-images` | Download local JPG assets |
| `npm run smoke-test` | Test all pages + admin auth (server must be running) |

## Project Structure

```
src/
├── app/                  # Next.js App Router (pages + API)
├── components/           # UI, sections, admin, layout
├── lib/                  # Data service, auth, Supabase, images
└── types/                # TypeScript types
public/images/            # Local images (JPG + SVG fallbacks)
supabase/schema.sql       # Production database schema
scripts/                  # Image download + smoke tests
```

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Database:** Supabase (optional)
- **Fonts:** Cormorant Garamond + Inter

## License

Private — Tatvaverse Projects
