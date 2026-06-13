-- Run this ENTIRE script in Supabase SQL Editor to fix all RLS issues

-- ==================== ORDERS TABLE ====================
DROP POLICY IF EXISTS "Public insert orders" ON orders;
DROP POLICY IF EXISTS "orders_insert_anon" ON orders;
DROP POLICY IF EXISTS "orders_insert_public" ON orders;
DROP POLICY IF EXISTS "Public read orders" ON orders;
DROP POLICY IF EXISTS "orders_select_public" ON orders;
DROP POLICY IF EXISTS "orders_select_auth" ON orders;

-- Allow anonymous and authenticated users to insert orders (public checkout)
CREATE POLICY "Allow public insert orders" ON orders
  FOR INSERT WITH CHECK (true);

-- Allow everyone to read orders (for tracking)
CREATE POLICY "Allow public read orders" ON orders
  FOR SELECT USING (true);

-- Allow authenticated users to update orders (admin dashboard)
CREATE POLICY "Allow auth update orders" ON orders
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete orders (admin dashboard)
CREATE POLICY "Allow auth delete orders" ON orders
  FOR DELETE USING (auth.role() = 'authenticated');

-- ==================== SETTINGS TABLE ====================
DROP POLICY IF EXISTS "Admin all settings" ON settings;
DROP POLICY IF EXISTS "Public read settings" ON settings;

-- Allow everyone to read settings (for checkout QR code, contact info)
CREATE POLICY "Allow public read settings" ON settings
  FOR SELECT USING (true);

-- Allow authenticated users to update settings (admin dashboard)
CREATE POLICY "Allow auth update settings" ON settings
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow authenticated users to insert settings (admin dashboard)
CREATE POLICY "Allow auth insert settings" ON settings
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- ==================== PRODUCTS TABLE ====================
DROP POLICY IF EXISTS "Public read products" ON products;
DROP POLICY IF EXISTS "Admin all products" ON products;

CREATE POLICY "Allow public read products" ON products
  FOR SELECT USING (true);

CREATE POLICY "Allow auth all products" ON products
  FOR ALL USING (auth.role() = 'authenticated');

-- ==================== GALLERY TABLE ====================
DROP POLICY IF EXISTS "Public read gallery" ON gallery;
DROP POLICY IF EXISTS "Admin all gallery" ON gallery;

CREATE POLICY "Allow public read gallery" ON gallery
  FOR SELECT USING (true);

CREATE POLICY "Allow auth all gallery" ON gallery
  FOR ALL USING (auth.role() = 'authenticated');