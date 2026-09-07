# Coderi

AI-powered logistics optimization for small ecommerce sellers.

## Features

- 🤖 AI-driven carrier selection & rate comparison
- 📦 Smart shipping rules engine
- 📊 Carrier performance analytics
- 🔮 Predictive delivery time estimates
- 🛍️ Shopify integration (coming soon)

## Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Backend**: Supabase (Postgres + Auth + Realtime)
- **Deployment**: Render
- **AI/ML**: Python/SageMaker (carrier selection pipeline)

## Getting Started

```bash
# Install dependencies
npm install

# Copy env file and fill in values
cp .env.local.example .env.local

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Deployment

This app is deployed on [Render](https://render.com).

Build command: `npm install && npm run build`
Start command: `npm start`
