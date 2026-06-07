-- DEFINITIVE RLS FIX
-- Run this in Supabase SQL Editor

-- STEP 1: Drop ALL existing policies on these tables
DO $$
DECLARE r RECORD;
BEGIN
  FOR r IN (
    SELECT schemaname, tablename, policyname FROM pg_policies
    WHERE schemaname = 'public' AND tablename IN ('products', 'orders', 'gallery', 'settings', 'profiles')
  ) LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I', r.policyname, r.schemaname, r.tablename);
  END LOOP;
END $$;

-- STEP 2: Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- STEP 3: For testing anon, also disable FORCE so we can test without auth
-- (FORCE makes RLS apply even to table owner; default RLS only applies to non-owners)

-- STEP 4: Create correct RLS policies

-- ===== PRODUCTS =====
-- Public can read
CREATE POLICY "products_read" ON products FOR SELECT TO anon, authenticated USING (true);
-- Only authenticated (admins) can write
CREATE POLICY "products_write" ON products FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "products_update" ON products FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "products_delete" ON products FOR DELETE TO authenticated USING (true);

-- ===== ORDERS =====
-- Anon can insert (public checkout)
CREATE POLICY "orders_insert_anon" ON orders FOR INSERT TO anon WITH CHECK (true);
-- Only authenticated can read
CREATE POLICY "orders_read" ON orders FOR SELECT TO authenticated USING (true);
-- Only authenticated can update
CREATE POLICY "orders_update" ON orders FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
-- Only authenticated can delete
CREATE POLICY "orders_delete" ON orders FOR DELETE TO authenticated USING (true);

-- ===== GALLERY =====
CREATE POLICY "gallery_read" ON gallery FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "gallery_write" ON gallery FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "gallery_update" ON gallery FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "gallery_delete" ON gallery FOR DELETE TO authenticated USING (true);

-- ===== SETTINGS =====
CREATE POLICY "settings_read" ON settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "settings_write" ON settings FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "settings_update" ON settings FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "settings_delete" ON settings FOR DELETE TO authenticated USING (true);

-- ===== PROFILES =====
CREATE POLICY "profiles_read" ON profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "profiles_insert" ON profiles FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "profiles_update" ON profiles FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "profiles_delete" ON profiles FOR DELETE TO authenticated USING (true);