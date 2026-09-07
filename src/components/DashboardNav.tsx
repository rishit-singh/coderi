"use client";

import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { LayoutDashboard, Package, BarChart3, Settings, LogOut } from "lucide-react";

export default function DashboardNav({ user }: { user: User }) {
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-lg font-bold text-white">Coderi</Link>
          <div className="flex items-center gap-1">
            {[
              { href: "/dashboard", label: "Overview", icon: <LayoutDashboard size={16} /> },
              { href: "/dashboard/shipments", label: "Shipments", icon: <Package size={16} /> },
              { href: "/dashboard/analytics", label: "Analytics", icon: <BarChart3 size={16} /> },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition px-3 py-2 rounded-lg hover:bg-slate-800"
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500">{user.email}</span>
          <Link
            href="/dashboard/settings"
            className="text-slate-400 hover:text-white transition p-2 rounded-lg hover:bg-slate-800"
          >
            <Settings size={16} />
          </Link>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-red-400 transition p-2 rounded-lg hover:bg-slate-800"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </nav>
  );
}
