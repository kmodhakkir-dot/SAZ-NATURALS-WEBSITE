import { createClient } from '@supabase/supabase-js'

const URL = 'https://wjcuzgtritigeqwyqhix.supabase.co'
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqY3V6Z3RyaXRpZ2Vxd3lxaGl4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDY4MTY3NCwiZXhwIjoyMDk2MjU3Njc0fQ.bmt6vGPIghuRYUPHqU9UsF8ZEJaNOdNrDOOSlyninxw'

const service = createClient(URL, SERVICE_KEY)

const sql = `
-- Drop ALL existing policies
DROP POLICY IF EXISTS "products_read" ON products;
DROP POLICY IF EXISTS "products_write" ON products;
DROP POLICY IF EXISTS "products_update" ON products;
DROP POLICY IF EXISTS "products_delete" ON products;

DROP POLICY IF EXISTS "orders_insert_anon" ON orders;
DROP POLICY IF EXISTS "orders_read" ON orders;
DROP POLICY IF EXISTS "orders_update" ON orders;
DROP POLICY IF EXISTS "orders_delete" ON orders;

DROP POLICY IF EXISTS "gallery_read" ON gallery;
DROP POLICY IF EXISTS "gallery_write" ON gallery;
DROP POLICY IF EXISTS "gallery_update" ON gallery;
DROP POLICY IF EXISTS "gallery_delete" ON gallery;

DROP POLICY IF EXISTS "settings_read" ON settings;
DROP POLICY IF EXISTS "settings_write" ON settings;
DROP POLICY IF EXISTS "settings_update" ON settings;
DROP POLICY IF EXISTS "settings_delete" ON settings;

DROP POLICY IF EXISTS "profiles_read" ON profiles;
DROP POLICY IF EXISTS "profiles_insert" ON profiles;
DROP POLICY IF EXISTS "profiles_update" ON profiles;
DROP POLICY IF EXISTS "profiles_delete" ON profiles;

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- ===== PRODUCTS =====
CREATE POLICY "products_read" ON products FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "products_write" ON products FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "products_update" ON products FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "products_delete" ON products FOR DELETE TO authenticated USING (true);

-- ===== ORDERS =====
CREATE POLICY "orders_insert_anon" ON orders FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "orders_read" ON orders FOR SELECT TO authenticated USING (true);
CREATE POLICY "orders_update" ON orders FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
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
`

async function applyFix() {
  console.log('Applying RLS fix...')
  try {
    // Try using the REST API directly
    const response = await fetch(`${URL}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SERVICE_KEY}`,
        'apikey': SERVICE_KEY,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({ sql })
    })
    
    const text = await response.text()
    console.log('Response:', response.status, text)
  } catch (err) {
    console.log('Error:', err.message)
    console.log('\n*** MANUAL APPLICATION REQUIRED ***')
    console.log('Run this SQL in Supabase SQL Editor:')
    console.log(sql)
  }
}

applyFix()