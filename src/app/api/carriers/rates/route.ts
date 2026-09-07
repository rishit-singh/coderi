import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { fromZip, toZip, weightOz, dimensions } = body;

  if (!fromZip || !toZip || !weightOz) {
    return NextResponse.json(
      { error: 'fromZip, toZip, and weightOz are required' },
      { status: 400 }
    );
  }

  // TODO: Integrate EasyPost / Shippo API here
  // For now, return mock rates
  const mockRates = [
    {
      carrier: 'USPS',
      service: 'Priority Mail',
      rate: 8.99,
      estimatedDays: 2,
      currency: 'USD',
    },
    {
      carrier: 'UPS',
      service: 'Ground',
      rate: 12.49,
      estimatedDays: 4,
      currency: 'USD',
    },
    {
      carrier: 'FedEx',
      service: 'Home Delivery',
      rate: 11.25,
      estimatedDays: 3,
      currency: 'USD',
    },
    {
      carrier: 'DHL',
      service: 'Express',
      rate: 18.75,
      estimatedDays: 1,
      currency: 'USD',
    },
  ];

  // Simple AI selection: cheapest that meets speed threshold
  const recommended = mockRates.reduce((best, rate) =>
    rate.rate < best.rate ? rate : best
  );

  return NextResponse.json({
    rates: mockRates.sort((a, b) => a.rate - b.rate),
    recommended,
    query: { fromZip, toZip, weightOz, dimensions },
  });
}
