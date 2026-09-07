'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import type { CarrierRate } from '@/types';

export function CarrierComparison() {
  const [fromZip, setFromZip] = useState('');
  const [toZip, setToZip] = useState('');
  const [weightOz, setWeightOz] = useState('');
  const [rates, setRates] = useState<CarrierRate[]>([]);
  const [recommended, setRecommended] = useState<CarrierRate | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchRates(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch('/api/carriers/rates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fromZip, toZip, weightOz: parseFloat(weightOz) }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Failed to fetch rates');
      setLoading(false);
      return;
    }

    setRates(data.rates);
    setRecommended(data.recommended);
    setLoading(false);
  }

  return (
    <div className="space-y-6">
      {/* Rate query form */}
      <Card>
        <CardHeader>
          <CardTitle>Get Rates</CardTitle>
        </CardHeader>
        <form onSubmit={fetchRates} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input
            label="From ZIP"
            placeholder="90001"
            value={fromZip}
            onChange={(e) => setFromZip(e.target.value)}
            required
            maxLength={10}
          />
          <Input
            label="To ZIP"
            placeholder="10001"
            value={toZip}
            onChange={(e) => setToZip(e.target.value)}
            required
            maxLength={10}
          />
          <Input
            label="Weight (oz)"
            type="number"
            placeholder="16"
            value={weightOz}
            onChange={(e) => setWeightOz(e.target.value)}
            required
            min="0.1"
            step="0.1"
          />
          <div className="sm:col-span-3">
            <Button type="submit" loading={loading} size="lg">
              Compare rates
            </Button>
          </div>
        </form>
      </Card>

      {/* AI Recommendation */}
      {recommended && (
        <Card className="border-brand-200 bg-brand-50">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🧠</span>
            <div>
              <p className="text-sm font-semibold text-brand-700">AI Recommendation</p>
              <p className="text-lg font-bold text-brand-900">
                {recommended.carrier} — {recommended.service}
              </p>
              <p className="text-sm text-brand-700">
                ${recommended.rate.toFixed(2)} · {recommended.estimatedDays} day{recommended.estimatedDays !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* All rates */}
      {rates.length > 0 && (
        <Card noPadding>
          <CardHeader className="px-6 pt-6">
            <CardTitle>All Rates</CardTitle>
          </CardHeader>
          <div className="divide-y divide-gray-50">
            {rates.map((rate) => (
              <div key={`${rate.carrier}-${rate.service}`} className="flex items-center justify-between px-6 py-4">
                <div>
                  <p className="font-medium text-gray-900">{rate.carrier}</p>
                  <p className="text-sm text-gray-500">{rate.service} · {rate.estimatedDays} day{rate.estimatedDays !== 1 ? 's' : ''}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">${rate.rate.toFixed(2)}</p>
                  <p className="text-xs text-gray-400">{rate.currency}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
}
