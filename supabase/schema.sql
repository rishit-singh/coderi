-- Coderi Database Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── Shipments ────────────────────────────────────────────────────────────
create table if not exists public.shipments (
  id              uuid primary key default uuid_generate_v4(),
  user_id         uuid not null references auth.users(id) on delete cascade,
  carrier         text not null,
  cost            numeric(10, 2) not null default 0,
  status          text not null default 'pending' check (status in ('pending', 'in_transit', 'delivered', 'failed')),
  tracking_number text,
  destination     text,
  origin          text,
  weight_oz       numeric(8, 2),
  dimensions      jsonb,
  selected_by_ai  boolean default true,
  ai_savings      numeric(10, 2),
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

-- ── Carrier Rates ────────────────────────────────────────────────────────
create table if not exists public.carrier_rates (
  id          uuid primary key default uuid_generate_v4(),
  shipment_id uuid references public.shipments(id) on delete cascade,
  carrier     text not null,
  service     text not null,
  rate        numeric(10, 2) not null,
  eta_days    integer,
  selected    boolean default false,
  fetched_at  timestamptz default now()
);

-- ── Shipping Rules ───────────────────────────────────────────────────────
create table if not exists public.shipping_rules (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  name        text not null,
  priority    integer default 0,
  conditions  jsonb not null default '{}'::jsonb,
  actions     jsonb not null default '{}'::jsonb,
  enabled     boolean default true,
  created_at  timestamptz default now()
);

-- ── Row Level Security ───────────────────────────────────────────────────
alter table public.shipments enable row level security;
alter table public.carrier_rates enable row level security;
alter table public.shipping_rules enable row level security;

-- Shipments: users see only their own
create policy "Users can view own shipments"
  on public.shipments for select
  using (auth.uid() = user_id);

create policy "Users can insert own shipments"
  on public.shipments for insert
  with check (auth.uid() = user_id);

create policy "Users can update own shipments"
  on public.shipments for update
  using (auth.uid() = user_id);

-- Carrier rates: linked to user shipments
create policy "Users can view rates for own shipments"
  on public.carrier_rates for select
  using (
    exists (
      select 1 from public.shipments
      where id = carrier_rates.shipment_id
      and user_id = auth.uid()
    )
  );

-- Shipping rules: users own their rules
create policy "Users can manage own shipping rules"
  on public.shipping_rules for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ── Updated_at trigger ───────────────────────────────────────────────────
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at
  before update on public.shipments
  for each row execute function public.handle_updated_at();
