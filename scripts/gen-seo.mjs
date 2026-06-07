import fs from 'fs'
import path from 'path'

const PUBLIC = path.resolve('public')
fs.mkdirSync(path.join(PUBLIC, 'images'), { recursive: true })

const FAVICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#2d7a3a"/><stop offset="100%" stop-color="#16a085"/></linearGradient></defs><rect width="64" height="64" rx="14" fill="url(#g)"/><text x="32" y="44" text-anchor="middle" font-size="40" fill="#fff">🌿</text></svg>`

const ROBOTS = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /checkout
Disallow: /success
Disallow: /#/admin
Disallow: /#/checkout
Disallow: /#/success

Sitemap: https://saznaturals.com/sitemap.xml
`

const SITEMAP = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://saznaturals.com/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>https://saznaturals.com/#/products</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://saznaturals.com/#/about</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://saznaturals.com/#/gallery</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://saznaturals.com/#/contact</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://saznaturals.com/#/privacy-policy</loc><changefreq>yearly</changefreq><priority>0.3</priority></url>
  <url><loc>https://saznaturals.com/#/terms-of-service</loc><changefreq>yearly</changefreq><priority>0.3</priority></url>
  <url><loc>https://saznaturals.com/#/refund-policy</loc><changefreq>yearly</changefreq><priority>0.3</priority></url>
</urlset>
`

const OG_COVER = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630"><defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0a3d2e"/><stop offset="50%" stop-color="#1e6e4f"/><stop offset="100%" stop-color="#2d7a3a"/></linearGradient></defs><rect width="1200" height="630" fill="url(#bg)"/><text x="600" y="280" text-anchor="middle" font-size="100" fill="#fff">🌿</text><text x="600" y="400" text-anchor="middle" font-family="Georgia,serif" font-size="76" font-weight="bold" fill="#fff">SAZ Naturals</text><text x="600" y="460" text-anchor="middle" font-family="Helvetica" font-size="32" fill="#fff">NATURAL BEAUTY STARTS HERE</text><text x="600" y="540" text-anchor="middle" font-family="Helvetica" font-size="22" fill="#fff" opacity="0.7">Handcrafted in Tanzania</text></svg>`

fs.writeFileSync(path.join(PUBLIC, 'favicon.svg'), FAVICON)
fs.writeFileSync(path.join(PUBLIC, 'robots.txt'), ROBOTS)
fs.writeFileSync(path.join(PUBLIC, 'sitemap.xml'), SITEMAP)
fs.writeFileSync(path.join(PUBLIC, 'images', 'og-cover.svg'), OG_COVER)
console.log('OK')
