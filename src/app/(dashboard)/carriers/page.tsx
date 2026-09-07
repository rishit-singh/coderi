import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { DashboardShell } from '@/components/features/dashboard/DashboardShell';
import { CarrierComparison } from '@/components/features/carriers/CarrierComparison';

export default async function CarriersPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  return (
    <DashboardShell user={user}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Carrier Comparison</h1>
          <p className="text-gray-500 text-sm mt-1">Compare rates across all carriers in real time</p>
        </div>
        <CarrierComparison />
      </div>
    </DashboardShell>
  );
}
