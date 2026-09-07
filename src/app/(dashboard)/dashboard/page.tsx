import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { DashboardShell } from '@/components/features/dashboard/DashboardShell';
import { ShipmentStats } from '@/components/features/dashboard/ShipmentStats';
import { RecentShipments } from '@/components/features/dashboard/RecentShipments';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  return (
    <DashboardShell user={user}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Your shipping overview</p>
        </div>
        <ShipmentStats />
        <RecentShipments />
      </div>
    </DashboardShell>
  );
}
