"use client";

import Link from "next/link";
import { ArrowRight, TrendingDown, Zap, BarChart3 } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/10">
        <span className="text-xl font-bold tracking-tight">Coderi</span>
        <div className="flex gap-4 items-center">
          <Link href="/login" className="text-sm text-white/70 hover:text-white transition">
            Sign in
          </Link>
          <Link
            href="/signup"
            className="bg-blue-600 hover:bg-blue-500 transition text-sm font-medium px-4 py-2 rounded-lg"
          >
            Get started free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-8 pt-24 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 rounded-full px-4 py-1.5 text-sm text-blue-300 mb-6">
          <Zap size={14} />
          AI-powered shipping intelligence
        </div>
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
          Stop overpaying on shipping.<br />
          <span className="text-blue-400">Start winning on margins.</span>
        </h1>
        <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10">
          Coderi uses AI to automatically select the best carrier for every shipment —
          cutting costs, saving time, and giving small ecommerce sellers the logistics
          intelligence that only enterprises could afford.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/signup"
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 transition font-semibold px-8 py-3.5 rounded-xl text-base"
          >
            Start for free <ArrowRight size={18} />
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 transition font-semibold px-8 py-3.5 rounded-xl text-base"
          >
            View demo dashboard
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-8 pb-24 grid md:grid-cols-3 gap-6">
        {[
          {
            icon: <TrendingDown size={24} className="text-blue-400" />,
            title: "AI Carrier Selection",
            desc: "Real-time rate comparison across USPS, UPS, FedEx, and DHL. AI picks the winner automatically.",
          },
          {
            icon: <Zap size={24} className="text-blue-400" />,
            title: "Smart Shipping Rules",
            desc: "Auto-route shipments by zone, weight, and delivery speed. Set it once, let it run.",
          },
          {
            icon: <BarChart3 size={24} className="text-blue-400" />,
            title: "Performance Analytics",
            desc: "See which carriers are underperforming on your routes. Data-driven decisions, not gut feelings.",
          },
        ].map((f) => (
          <div key={f.title} className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="mb-3">{f.icon}</div>
            <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
            <p className="text-white/60 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
