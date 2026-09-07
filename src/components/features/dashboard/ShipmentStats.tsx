import { Card } from '@/components/ui/Card';

const STATS = [
  { label: 'Total shipments', value: '—', delta: null, icon: '📦' },
  { label: 'Avg. savings/shipment', value: '—', delta: null, icon: '💰' },
  { label: 'Carriers used', value: '—', delta: null, icon: '🚚' },
  { label: 'Delivery success rate', value: '—', delta: null, icon: '✅' },
];

export function ShipmentStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {STATS.map((stat) => (
        <Card key={stat.label}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">{stat.icon}</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
        </Card>
      ))}
    </div>
  );
}
