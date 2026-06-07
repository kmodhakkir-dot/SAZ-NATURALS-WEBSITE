import { unlinkSync } from 'fs'

const files = [
  'src/data/products.js',
  'src/data/gallery.js',
  'src/data/admin.js'
]

for (const f of files) {
  try {
    unlinkSync(f)
    console.log('Deleted:', f)
  } catch (e) {
    console.log('Skip:', f, e.message.slice(0, 50))
  }
}