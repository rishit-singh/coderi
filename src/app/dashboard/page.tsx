import { createClient } from "@/utils/supabase/server";
import ShipmentStats from "@/components/ShipmentStats";
import CarrierTable from "@/components/CarrierTable";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch recent shipments
  const { data: shipments } = await supabase
    .from("shipments")
    .select("*")
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false })
    .limit(10);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">Your shipping intelligence overview</p>
      </div>

      <ShipmentStats shipments={shipments ?? []} />

      <div>
        <h2 className="text-lg font-semibold mb-4">Recent Shipments</h2>
        <CarrierTable shipments={shipments ?? []} />
      </div>
    </div>
  );
}
