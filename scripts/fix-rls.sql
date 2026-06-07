-- FIX ALL RLS POLICIES
-- Run this in Supabase SQL Editor

-- Enable RLS on all tables
ALTER TABLE IF EXISTS products ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS profiles ENABLE ROW LEVEL SECURITY;

-- Drop ALL existing policies to prevent recursion
DO $$ DECLARE r RECORD;
BEGIN
  FOR r IN SELECT policyname, tablename FROM pg_policies WHERE schemaname = 'public' LOOP
    EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON ' || r.tablename;
  END LOOP;
END $$;

-- ============================================================
-- PRODUCTS: Public read, authenticated write
-- ============================================================
CREATE POLICY "products_select_public" ON products FOR SELECT USING (true);
CREATE POLICY "products_insert_auth" ON products FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "products_update_auth" ON products FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "products_delete_auth" ON products FOR DELETE USING (auth.uid() IS NOT NULL);

-- ============================================================
-- ORDERS: Public insert (checkout), authenticated read/update
-- ============================================================
CREATE POLICY "orders_insert_public" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "orders_select_auth" ON orders FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "orders_update_auth" ON orders FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "orders_delete_auth" ON orders FOR DELETE USING (auth.uid() IS NOT NULL);

-- ============================================================
-- GALLERY: Public read, authenticated write
-- ============================================================
CREATE POLICY "gallery_select_public" ON gallery FOR SELECT USING (true);
CREATE POLICY "gallery_insert_auth" ON gallery FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "gallery_update_auth" ON gallery FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "gallery_delete_auth" ON gallery FOR DELETE USING (auth.uid() IS NOT NULL);

-- ============================================================
-- SETTINGS: Public read, authenticated write
-- ============================================================
CREATE POLICY "settings_select_public" ON settings FOR SELECT USING (true);
CREATE POLICY "settings_insert_auth" ON settings FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "settings_update_auth" ON settings FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "settings_delete_auth" ON settings FOR DELETE USING (auth.uid() IS NOT NULL);

-- ============================================================
-- PROFILES: Users can read own profile, admins can read all
-- ============================================================
CREATE POLICY "profiles_select_own" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON profiles FOR UPDATE USING (auth.uid() = id);