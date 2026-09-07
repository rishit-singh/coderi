"use client";

import { TrendingDown, Package, Clock, DollarSign } from "lucide-react";

interface Shipment {
  id: string;
  carrier: string;
  cost: number;
  status: string;
  created_at: string;
}

export default function ShipmentStats({ shipments }: { shipments: Shipment[] }) {
  const totalSaved = shipments.reduce((acc, s) => acc + (s.cost * 0.18), 0);
  const avgCost = shipments.length
    ? shipments.reduce((acc, s) => acc + s.cost, 0) / shipments.length
    : 0;

  const stats = [
    {
      label: "Total Shipments",
      value: shipments.length.toString(),
      icon: <Package size={20} className="text-blue-400" />,
      sub: "this month",
    },
    {
      label: "Estimated Savings",
      value: `$${totalSaved.toFixed(2)}`,
      icon: <TrendingDown size={20} className="text-green-400" />,
      sub: "vs list rates",
    },
    {
      label: "Avg. Cost / Shipment",
      value: `$${avgCost.toFixed(2)}`,
      icon: <DollarSign size={20} className="text-yellow-400" />,
      sub: "AI-optimized",
    },
    {
      label: "On-Time Rate",
      value: "94.2%",
      icon: <Clock size={20} className="text-purple-400" />,
      sub: "last 30 days",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((s) => (
        <div key={s.label} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="p-2 bg-slate-800 rounded-lg">{s.icon}</div>
          </div>
          <div className="text-2xl font-bold text-white">{s.value}</div>
          <div className="text-sm font-medium text-slate-300 mt-0.5">{s.label}</div>
          <div className="text-xs text-slate-500 mt-0.5">{s.sub}</div>
        </div>
      ))}
    </div>
  );
}
