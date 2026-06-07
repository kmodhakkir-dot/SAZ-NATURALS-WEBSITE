-- ============================================================
-- SAZ NATURALS - SUPABASE DATABASE SETUP
-- Run this in your Supabase SQL Editor
-- ============================================================

-- 1. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS products (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  benefits TEXT[] DEFAULT '{}',
  price TEXT NOT NULL,
  badge TEXT,
  image TEXT DEFAULT '/placeholder.svg',
  icon TEXT DEFAULT '🌿',
  cost_price TEXT DEFAULT '',
  stock INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. ORDERS TABLE
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  region TEXT NOT NULL,
  items JSONB NOT NULL DEFAULT '[]',
  total NUMERIC NOT NULL DEFAULT 0,
  delivery_fee NUMERIC DEFAULT 0,
  payment_proof TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

-- 3. GALLERY TABLE
CREATE TABLE IF NOT EXISTS gallery (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. SETTINGS TABLE (single-row config)
CREATE TABLE IF NOT EXISTS settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  business_name TEXT DEFAULT 'SAZ Naturals',
  business_logo TEXT,
  whatsapp_number TEXT DEFAULT '255655799575',
  merchant_number TEXT DEFAULT '255655799575',
  merchant_name TEXT DEFAULT 'SAZ Naturals',
  qr_image TEXT,
  contact_phone TEXT DEFAULT '+255 655 799 575',
  contact_email TEXT DEFAULT '',
  business_address TEXT DEFAULT 'Tanzania',
  facebook TEXT DEFAULT '',
  instagram TEXT DEFAULT '',
  tiktok TEXT DEFAULT '@sazorganicss',
  delivery_fee TEXT DEFAULT '3000',
  min_order TEXT DEFAULT '0'
);

-- Insert default settings row
INSERT INTO settings (id) VALUES (1) ON CONFLICT DO NOTHING;

-- ============================================================
-- ROW LEVEL SECURITY (RLS) - LAYER 5
-- ============================================================

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies (to avoid conflicts when re-running)
DROP POLICY IF EXISTS "Public read products" ON products;
DROP POLICY IF EXISTS "Public read gallery" ON gallery;
DROP POLICY IF EXISTS "Public insert orders" ON orders;
DROP POLICY IF EXISTS "Admin all products" ON products;
DROP POLICY IF EXISTS "Admin all orders" ON orders;
DROP POLICY IF EXISTS "Admin all gallery" ON gallery;
DROP POLICY IF EXISTS "Admin all settings" ON settings;

-- Public read policies
CREATE POLICY "Public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Public read gallery" ON gallery FOR SELECT USING (true);

-- Public insert for orders (customers placing orders)
CREATE POLICY "Public insert orders" ON orders FOR INSERT WITH CHECK (true);

-- Admin full access policies (authenticated role)
CREATE POLICY "Admin all products" ON products FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all orders" ON orders FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all gallery" ON gallery FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all settings" ON settings FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================
-- SEED DATA - Initial products (Layer 3)
-- ============================================================

INSERT INTO products (name, category, description, benefits, price, badge, image, icon) VALUES
('Pure Growth Oil', 'oils', 'Our signature growth oil crafted by nature and loved by you. Promotes healthy hair growth and strengthens roots with pure natural ingredients.', ARRAY['Growth', 'Strengthening', 'Natural'], 'TZS 6,000', 'Best Seller', '/images/pure-growth-oil.jpg', '🌿'),
('Nourishing Hair Butter', 'hair', 'Deeply moisturizes and revitalizes natural hair. Rich in shea butter and coconut oil.', ARRAY['Moisturizing', 'Anti-Breakage', 'Shine'], 'TZS 15,000', NULL, 'images/hair-butter.jpg', '🌿'),
('Growth Stimulating Oil', 'hair', 'Promotes hair growth and strengthens roots with rosemary, peppermint, and castor oil.', ARRAY['Growth', 'Strengthening', 'Scalp Health'], 'TZS 12,000', NULL, 'images/growth-oil.jpg', '🌱'),
('Coconut & Aloe Conditioner', 'hair', 'Silky, sulfate-free conditioner with virgin coconut oil and fresh aloe vera.', ARRAY['Detangling', 'Softness', 'Sulfate-Free'], 'TZS 14,000', 'New', 'images/coconut-conditioner.jpg', '🥥'),
('Flaxseed Hair Gel', 'hair', 'Natural hold gel for curls and twists. Made from organic flaxseeds.', ARRAY['Curl Definition', 'Natural Hold', 'Alcohol-Free'], 'TZS 10,000', NULL, 'images/flaxseed-gel.jpg', '💧'),
('Shea Butter Body Lotion', 'skin', 'Ultra-rich body moisturizer with unrefined shea butter, cocoa butter, and vitamin E.', ARRAY['Deep Hydration', 'Glow', 'Non-Greasy'], 'TZS 18,000', 'Popular', 'images/shea-lotion.jpg', '✨'),
('Brightening Face Serum', 'skin', 'Vitamin C serum with tamanu oil and licorice root extract for even skin tone.', ARRAY['Brightening', 'Even Tone', 'Anti-Acne'], 'TZS 20,000', NULL, 'images/face-serum.jpg', '💎'),
('Aloe Vera Face Wash', 'skin', 'Gentle, foaming daily cleanser with fresh aloe vera and tea tree oil.', ARRAY['Gentle', 'Deep Clean', 'Balancing'], 'TZS 11,000', NULL, 'images/aloe-face-wash.jpg', '🧼'),
('Pure Argan Oil', 'oils', 'Cold-pressed argan oil from Morocco. Perfect for hair, face, and nails.', ARRAY['Multi-Use', 'Anti-Aging', 'Non-Comedogenic'], 'TZS 22,000', 'Premium', 'images/argan-oil.jpg', '🫒'),
('Black Castor Oil', 'oils', 'Jamaican black castor oil — the ultimate growth elixir for hair and brows.', ARRAY['Thickening', 'Growth', 'Brow & Lash'], 'TZS 16,000', NULL, 'images/castor-oil.jpg', '💧'),
('Tea Tree & Peppermint Oil', 'oils', 'Refreshing scalp oil blend with tea tree, peppermint, and eucalyptus essential oils.', ARRAY['Scalp Care', 'Dandruff', 'Cooling'], 'TZS 13,000', NULL, 'images/tea-tree-oil.jpg', '🌿'),
('Lavender Soap Bar', 'handmade', 'Handcrafted cold-process soap with lavender essential oil and oatmeal.', ARRAY['Handmade', 'Exfoliating', 'Calming'], 'TZS 8,000', NULL, 'images/lavender-soap.jpg', '🌸'),
('Sugar Body Scrub', 'handmade', 'Exfoliating brown sugar scrub with coconut oil and vanilla bean.', ARRAY['Exfoliating', 'Nourishing', 'Natural'], 'TZS 12,000', 'Eco-Friendly', 'images/sugar-scrub.jpg', '🧴'),
('Beeswax Lip Balm Set', 'handmade', 'Set of 3 tinted lip balms made with beeswax, coconut oil, and natural pigments.', ARRAY['Moisturizing', 'Tinted', 'Handmade'], 'TZS 9,000', NULL, 'images/lip-balm.jpg', '💋')
ON CONFLICT DO NOTHING;

-- Initial gallery seed
INSERT INTO gallery (title, description, image) VALUES
('Pure Growth Oil', 'Our signature product in action', '/images/pure-growth-oil.jpg'),
('Nourishing Hair Butter', 'Nourishing natural hair butter', '/images/hair-butter.jpg'),
('Growth Stimulating Oil', 'Hair growth stimulant', '/images/growth-oil.jpg'),
('Coconut & Aloe Conditioner', 'Sulfate-free hair conditioner', '/images/coconut-conditioner.jpg'),
('Flaxseed Hair Gel', 'Natural hold hair gel', '/images/flaxseed-gel.jpg'),
('Shea Butter Body Lotion', 'Ultra-rich body moisturizer', '/images/shea-lotion.jpg')
ON CONFLICT DO NOTHING;