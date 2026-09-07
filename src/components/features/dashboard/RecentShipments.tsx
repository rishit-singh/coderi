import { Card, CardHeader, CardTitle } from '@/components/ui/Card';

export function RecentShipments() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Shipments</CardTitle>
      </CardHeader>
      <div className="text-center py-12 text-gray-400">
        <div className="text-4xl mb-3">📦</div>
        <p className="text-sm">No shipments yet</p>
        <p className="text-xs mt-1">Create your first shipment to get started</p>
      </div>
    </Card>
  );
}
