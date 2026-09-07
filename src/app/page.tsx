import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-brand-900 via-brand-700 to-brand-500">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <span className="text-white text-2xl font-bold tracking-tight">Coderi</span>
        <div className="flex gap-4">
          <Link href="/login" className="text-white/80 hover:text-white text-sm transition">
            Log in
          </Link>
          <Link
            href="/signup"
            className="bg-white text-brand-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-brand-50 transition"
          >
            Get started free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-4 pt-24 pb-32">
        <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 text-xs font-medium px-3 py-1 rounded-full mb-6 border border-white/20">
          🚀 AI-powered shipping intelligence
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight max-w-3xl">
          Ship smarter.
          <br />
          <span className="text-brand-100">Save up to 40%</span> on every order.
        </h1>
        <p className="mt-6 text-lg text-white/70 max-w-xl">
          Coderi automatically picks the fastest, cheapest carrier for every shipment — no spreadsheets, no guesswork.
        </p>
        <div className="mt-10 flex gap-4">
          <Link
            href="/signup"
            className="bg-white text-brand-700 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-brand-50 transition shadow-lg"
          >
            Start for free
          </Link>
          <Link
            href="/dashboard"
            className="border border-white/30 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-white/10 transition"
          >
            View dashboard
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-8 pb-24 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            icon: '⚡',
            title: 'Instant rate comparison',
            desc: 'Compare UPS, FedEx, USPS, DHL and more in real time at checkout.',
          },
          {
            icon: '🧠',
            title: 'AI carrier selection',
            desc: 'Our model learns your shipment patterns and picks the best option automatically.',
          },
          {
            icon: '📊',
            title: 'Carrier analytics',
            desc: 'See which carriers are underperforming on your lanes and fix it fast.',
          },
        ].map((f) => (
          <div
            key={f.title}
            className="bg-white/10 border border-white/20 rounded-2xl p-6 text-white backdrop-blur"
          >
            <div className="text-3xl mb-3">{f.icon}</div>
            <h3 className="font-semibold text-lg mb-1">{f.title}</h3>
            <p className="text-white/70 text-sm">{f.desc}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
