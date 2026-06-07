import { createClient } from '@supabase/supabase-js'

const s = createClient(
  'https://wjcuzgtritigeqwyqhix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqY3V6Z3RyaXRpZ2Vxd3lxaGl4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDY4MTY3NCwiZXhwIjoyMDk2MjU3Njc0fQ.bmt6vGPIghuRYUPHqU9UsF8ZEJaNOdNrDOOSlyninxw'
)

const products = [
  { name:'Nourishing Hair Butter', category:'hair', description:'Deeply moisturizes and revitalizes natural hair.', benefits:['Moisturizing','Anti-Breakage','Shine'], price:'TZS 15,000' },
  { name:'Growth Stimulating Oil', category:'hair', description:'Promotes hair growth and strengthens roots.', benefits:['Growth','Strengthening','Scalp Health'], price:'TZS 12,000' },
  { name:'Coconut & Aloe Conditioner', category:'hair', description:'Silky, sulfate-free conditioner.', benefits:['Detangling','Softness','Sulfate-Free'], price:'TZS 14,000' },
  { name:'Flaxseed Hair Gel', category:'hair', description:'Natural hold gel for curls.', benefits:['Curl Definition','Natural Hold','Alcohol-Free'], price:'TZS 10,000' },
  { name:'Shea Butter Body Lotion', category:'skin', description:'Ultra-rich body moisturizer.', benefits:['Deep Hydration','Glow','Non-Greasy'], price:'TZS 18,000' },
  { name:'Brightening Face Serum', category:'skin', description:'Vitamin C serum for even skin tone.', benefits:['Brightening','Even Tone','Anti-Acne'], price:'TZS 20,000' },
  { name:'Aloe Vera Face Wash', category:'skin', description:'Gentle foaming daily cleanser.', benefits:['Gentle','Deep Clean','Balancing'], price:'TZS 11,000' },
  { name:'Pure Argan Oil', category:'oils', description:'Cold-pressed argan oil from Morocco.', benefits:['Multi-Use','Anti-Aging','Non-Comedogenic'], price:'TZS 22,000' },
  { name:'Black Castor Oil', category:'oils', description:'Jamaican black castor oil.', benefits:['Thickening','Growth','Brow & Lash'], price:'TZS 16,000' },
  { name:'Tea Tree & Peppermint Oil', category:'oils', description:'Refreshing scalp oil blend.', benefits:['Scalp Care','Dandruff','Cooling'], price:'TZS 13,000' },
  { name:'Lavender Soap Bar', category:'handmade', description:'Handcrafted cold-process soap.', benefits:['Handmade','Exfoliating','Calming'], price:'TZS 8,000' },
  { name:'Sugar Body Scrub', category:'handmade', description:'Exfoliating brown sugar scrub.', benefits:['Exfoliating','Nourishing','Natural'], price:'TZS 12,000' },
  { name:'Beeswax Lip Balm Set', category:'handmade', description:'Set of 3 tinted lip balms.', benefits:['Moisturizing','Tinted','Handmade'], price:'TZS 9,000' }
]

const gallery = [
  { title:'Nourishing Hair Butter', description:'Nourishing natural hair butter', image:'images/hair-butter.jpg' },
  { title:'Growth Stimulating Oil', description:'Hair growth stimulant', image:'images/growth-oil.jpg' },
  { title:'Coconut & Aloe Conditioner', description:'Sulfate-free hair conditioner', image:'images/coconut-conditioner.jpg' },
  { title:'Flaxseed Hair Gel', description:'Natural hold hair gel', image:'images/flaxseed-gel.jpg' },
  { title:'Shea Butter Body Lotion', description:'Ultra-rich body moisturizer', image:'images/shea-lotion.jpg' }
]

async function seed() {
  process.stdout.write('Seeding products... ')
  for (const p of products) {
    const { error } = await s.from('products').insert([p])
    if (error) process.stdout.write(`\n  ERROR ${p.name}: ${error.message}`)
  }
  process.stdout.write('done\n')

  process.stdout.write('Seeding gallery... ')
  for (const g of gallery) {
    const { error } = await s.from('gallery').insert([g])
    if (error) process.stdout.write(`\n  ERROR ${g.title}: ${error.message}`)
  }
  process.stdout.write('done\n')

  // Verify
  const { data: pData, count: pCount } = await s.from('products').select('*', { count: 'exact', head: true })
  const { data: gData, count: gCount } = await s.from('gallery').select('*', { count: 'exact', head: true })
  console.log(`Products: ${pCount} rows`)
  console.log(`Gallery: ${gCount} rows`)
}

seed().catch(e => console.error('FATAL:', e))