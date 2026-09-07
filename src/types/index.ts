export interface Shipment {
  id: string;
  user_id: string;
  from_zip: string;
  to_zip: string;
  weight_oz: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  carrier?: string;
  service?: string;
  rate?: number;
  tracking_number?: string;
  status: 'pending' | 'label_created' | 'in_transit' | 'delivered' | 'failed';
  created_at: string;
  updated_at: string;
}

export interface CarrierRate {
  carrier: string;
  service: string;
  rate: number;
  estimatedDays: number;
  currency: string;
  isRecommended?: boolean;
}

export interface CarrierPerformance {
  carrier: string;
  avgRate: number;
  avgDeliveryDays: number;
  onTimeRate: number;
  totalShipments: number;
}

export interface User {
  id: string;
  email: string;
  full_name?: string;
  company_name?: string;
  monthly_shipments?: number;
  created_at: string;
}
