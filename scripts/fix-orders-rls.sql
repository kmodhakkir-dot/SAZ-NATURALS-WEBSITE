-- Run this in Supabase SQL Editor to fix RLS for orders
-- This allows anonymous users to insert orders (for checkout)

-- Drop existing conflicting policies
DROP POLICY IF EXISTS "Public insert orders" ON orders;
DROP POLICY IF EXISTS "orders_insert_anon" ON orders;
DROP POLICY IF EXISTS "orders_insert_public" ON orders;

-- Allow anonymous users to insert orders (public checkout)
CREATE POLICY "Allow public insert orders" ON orders
  FOR INSERT
  WITH CHECK (true);

-- Allow public read for order tracking
DROP POLICY IF EXISTS "Public read orders" ON orders;
DROP POLICY IF EXISTS "orders_select_public" ON orders;
CREATE POLICY "Allow public read orders" ON orders
  FOR SELECT
  USING (true);