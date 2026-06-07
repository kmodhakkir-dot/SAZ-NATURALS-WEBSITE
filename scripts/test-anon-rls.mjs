import { createClient } from '@supabase/supabase-js'

const URL = 'https://wjcuzgtritigeqwyqhix.supabase.co'
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqY3V6Z3RyaXRpZ2Vxd3lxaGl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2ODE2NzQsImV4cCI6MjA5NjI1NzY3NH0.Vz5yza8zHq8JRFqInDII50u1hSubmd6WHizI-T6yuAI'

const anon = createClient(URL, ANON_KEY)

async function test() {
  const { data: prods } = await anon.from('products').select('id, name').limit(1)
  console.log('Products:', prods?.length)
  if (prods?.length) {
    const id = prods[0].id
    console.log('Product ID:', id)
    const { error: updErr } = await anon.from('products').update({ name: 'TEST' }).eq('id', id)
    console.log('ANON UPDATE products:', updErr ? 'BLOCKED: ' + updErr.message : 'ALLOWED!')
    const { error: delErr } = await anon.from('products').delete().eq('id', id)
    console.log('ANON DELETE products:', delErr ? 'BLOCKED: ' + delErr.message : 'ALLOWED!')
  }
  const { error: profUpd } = await anon.from('profiles').update({ name: 'hack' }).eq('id', '11111111-1111-1111-1111-111111111111')
  console.log('ANON UPDATE profiles:', profUpd ? 'BLOCKED: ' + profUpd.message : 'ALLOWED!')
  const { error: profDel } = await anon.from('profiles').delete().eq('id', '11111111-1111-1111-1111-111111111111')
  console.log('ANON DELETE profiles:', profDel ? 'BLOCKED: ' + profDel.message : 'ALLOWED!')
}

test()