"use client";

interface Shipment {
  id: string;
  carrier: string;
  cost: number;
  status: string;
  created_at: string;
  tracking_number?: string;
  destination?: string;
}

const STATUS_STYLES: Record<string, string> = {
  delivered: "bg-green-500/15 text-green-400",
  in_transit: "bg-blue-500/15 text-blue-400",
  pending: "bg-yellow-500/15 text-yellow-400",
  failed: "bg-red-500/15 text-red-400",
};

export default function CarrierTable({ shipments }: { shipments: Shipment[] }) {
  if (!shipments.length) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center">
        <div className="text-3xl mb-3">📦</div>
        <p className="text-slate-400 text-sm">No shipments yet. Your first AI-optimized label is waiting.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-800">
            {["Tracking", "Destination", "Carrier", "Cost", "Status", "Date"].map((h) => (
              <th key={h} className="text-left px-5 py-3.5 text-xs font-medium text-slate-500 uppercase tracking-wider">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {shipments.map((s) => (
            <tr key={s.id} className="hover:bg-slate-800/50 transition">
              <td className="px-5 py-4 font-mono text-xs text-slate-300">{s.tracking_number ?? "—"}</td>
              <td className="px-5 py-4 text-slate-300">{s.destination ?? "—"}</td>
              <td className="px-5 py-4 font-medium">{s.carrier}</td>
              <td className="px-5 py-4 text-green-400">${s.cost.toFixed(2)}</td>
              <td className="px-5 py-4">
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[s.status] ?? "bg-slate-700 text-slate-300"}`}>
                  {s.status.replace("_", " ")}
                </span>
              </td>
              <td className="px-5 py-4 text-slate-500">{new Date(s.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
