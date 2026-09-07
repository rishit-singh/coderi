# Coderi

**AI-powered logistics optimization for small ecommerce sellers.**

Coderi automatically selects the best carrier and shipping route on every order, saving small sellers up to 40% on shipping costs.

## Stack

- **Framework**: Next.js 15 (App Router)
- **Database + Auth**: Supabase
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Deployment**: Render

## Getting Started

```bash
npm install
cp .env.example .env.local
# Fill in your Supabase credentials in .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
  app/              # Next.js App Router pages
    (auth)/         # Auth routes (login, signup)
    (dashboard)/    # Protected dashboard routes
    api/            # API route handlers
  components/
    ui/             # Base UI components
    features/       # Feature-specific components
  lib/
    supabase/       # Supabase client utilities
    carriers/       # Carrier API integrations
    ai/             # AI/ML logic
  types/            # TypeScript types
  hooks/            # Custom React hooks
```

## Deployment

Deployed on [Render](https://render.com). Build command: `npm install && npm run build`. Start command: `npm start`.
