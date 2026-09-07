-- Coderi Initial Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles (extends Supabase auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  company_name text,
  monthly_shipments_estimate integer,
  shopify_store_url text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Shipments
create table public.shipments (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  from_zip text not null,
  to_zip text not null,
  weight_oz numeric(10,2) not null,
  length_in numeric(8,2),
  width_in numeric(8,2),
  height_in numeric(8,2),
  carrier text,
  service text,
  rate numeric(10,2),
  currency text default 'USD',
  tracking_number text,
  label_url text,
  status text default 'pending' check (status in ('pending','label_created','in_transit','delivered','failed')),
  estimated_days integer,
  actual_days integer,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Carrier performance cache
create table public.carrier_performance (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  carrier text not null,
  service text not null,
  from_zip_prefix text not null, -- first 3 digits for lane grouping
  to_zip_prefix text not null,
  avg_rate numeric(10,2),
  avg_days numeric(5,2),
  on_time_rate numeric(5,4), -- 0.0 to 1.0
  sample_size integer default 0,
  last_updated timestamptz default now(),
  unique(user_id, carrier, service, from_zip_prefix, to_zip_prefix)
);

-- Rate lookup cache
create table public.rate_cache (
  id uuid default uuid_generate_v4() primary key,
  from_zip text not null,
  to_zip text not null,
  weight_oz numeric(10,2) not null,
  carrier text not null,
  service text not null,
  rate numeric(10,2) not null,
  estimated_days integer,
  fetched_at timestamptz default now() not null,
  expires_at timestamptz default now() + interval '1 hour' not null
);

-- Row-Level Security
alter table public.profiles enable row level security;
alter table public.shipments enable row level security;
alter table public.carrier_performance enable row level security;

-- Profiles: users can only see/edit their own
create policy "profiles_self" on public.profiles
  for all using (auth.uid() = id);

-- Shipments: users can only see/edit their own
create policy "shipments_self" on public.shipments
  for all using (auth.uid() = user_id);

-- Carrier performance: users can only see their own
create policy "carrier_perf_self" on public.carrier_performance
  for all using (auth.uid() = user_id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Indexes
create index idx_shipments_user_id on public.shipments(user_id);
create index idx_shipments_status on public.shipments(status);
create index idx_carrier_perf_user on public.carrier_performance(user_id, carrier);
create index idx_rate_cache_lookup on public.rate_cache(from_zip, to_zip, weight_oz);
create index idx_rate_cache_expires on public.rate_cache(expires_at);
