const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://europalletsupply.com';
const TODAY = new Date().toISOString().split('T')[0];

// Extract data by reading the source data files
const productsFilePath = path.join(__dirname, '../src/data/products.ts');
const categoriesFilePath = path.join(__dirname, '../src/data/categories.ts');
const blogFilePath = path.join(__dirname, '../src/data/blogPosts.ts');
const keywordsFilePath = path.join(__dirname, '../src/data/keywords.ts');

const productContent = fs.readFileSync(productsFilePath, 'utf8');
const categoryContent = fs.readFileSync(categoriesFilePath, 'utf8');
const blogContent = fs.readFileSync(blogFilePath, 'utf8');
const keywordsContent = fs.readFileSync(keywordsFilePath, 'utf8');

// Parse products
const productBlocks = productContent.split(/\{\s*id:\s*'/).slice(1);
const products = [];
for (const block of productBlocks) {
  const idMatch = block.match(/^([^']+)'/);
  const titleMatch = block.match(/title:\s*'([^']+)'/);
  const priceMatch = block.match(/price:\s*([0-9.]+)/);
  const categoryIdMatch = block.match(/categoryId:\s*'([^']+)'/);
  if (idMatch && idMatch[1].startsWith('prod-plt-')) {
    products.push({
      id: idMatch[1],
      title: titleMatch ? titleMatch[1] : idMatch[1],
      price: priceMatch ? priceMatch[1] : '0',
      categoryId: categoryIdMatch ? categoryIdMatch[1] : ''
    });
  }
}

// Parse categories
const categorySlugs = [...categoryContent.matchAll(/slug:\s*'([^']+)'/g)].map(m => m[1]);
const uniqueCategories = [...new Set(categorySlugs)];

// Parse blog posts
const blogSlugs = [...blogContent.matchAll(/slug:\s*'([^']+)'/g)].map(m => m[1]);
const uniqueBlogSlugs = [...new Set(blogSlugs)];

// Parse keywords
const keywordSlugs = [...keywordsContent.matchAll(/slug:\s*'([^']+)'/g)].map(m => m[1]);
const uniqueKeywordSlugs = [...new Set(keywordSlugs)];

// 1. Pages Sitemap
const pages = [
  { path: '', priority: '1.0', changefreq: 'daily' },
  { path: 'shop', priority: '0.95', changefreq: 'daily' },
  { path: 'keywords', priority: '0.90', changefreq: 'daily' },
  { path: 'about', priority: '0.80', changefreq: 'monthly' },
  { path: 'contact', priority: '0.80', changefreq: 'monthly' },
  { path: 'blog', priority: '0.85', changefreq: 'weekly' },
  { path: 'faq', priority: '0.75', changefreq: 'monthly' },
];

const pagesXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url>
    <loc>${DOMAIN}${p.path ? '/' + p.path : '/'}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

// 2. Categories Sitemap
const categoriesXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueCategories.map(slug => `  <url>
    <loc>${DOMAIN}/shop/${slug}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.85</priority>
  </url>`).join('\n')}
</urlset>`;

// 3. Products Sitemap (with Google Image Sitemap tags)
const productsXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${products.map(p => `  <url>
    <loc>${DOMAIN}/product/${p.id}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.80</priority>
    <image:image>
      <image:loc>${DOMAIN}/favicon.svg</image:loc>
      <image:title>${p.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')}</image:title>
      <image:caption>Liquidation overstock pallet lot: ${p.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')}</image:caption>
    </image:image>
  </url>`).join('\n')}
</urlset>`;

// 4. Blog Posts Sitemap
const blogXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueBlogSlugs.map(slug => `  <url>
    <loc>${DOMAIN}/blog/${slug}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.75</priority>
  </url>`).join('\n')}
</urlset>`;

// 5. Keywords Directory Sitemap
const keywordsXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueKeywordSlugs.map(slug => `  <url>
    <loc>${DOMAIN}/search?q=${encodeURIComponent(slug)}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.85</priority>
  </url>`).join('\n')}
</urlset>`;

// 6. Root Sitemap Index
const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${DOMAIN}/sitemap-pages.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${DOMAIN}/sitemap-categories.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${DOMAIN}/sitemap-products.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${DOMAIN}/sitemap-blog.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${DOMAIN}/sitemap-keywords.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
</sitemapindex>`;

// 7. Robots.txt
const robotsTxt = `# robots.txt for EuroPalletSupply.com
User-agent: *
Allow: /
Disallow: /checkout/success
Disallow: /api/

# Host & Sitemaps
Host: ${DOMAIN}
Sitemap: ${DOMAIN}/sitemap.xml
Sitemap: ${DOMAIN}/sitemap-pages.xml
Sitemap: ${DOMAIN}/sitemap-categories.xml
Sitemap: ${DOMAIN}/sitemap-products.xml
Sitemap: ${DOMAIN}/sitemap-blog.xml
Sitemap: ${DOMAIN}/sitemap-keywords.xml
`;

const publicDir = path.join(__dirname, '../public');
fs.writeFileSync(path.join(publicDir, 'sitemap-pages.xml'), pagesXml.trim());
fs.writeFileSync(path.join(publicDir, 'sitemap-categories.xml'), categoriesXml.trim());
fs.writeFileSync(path.join(publicDir, 'sitemap-products.xml'), productsXml.trim());
fs.writeFileSync(path.join(publicDir, 'sitemap-blog.xml'), blogXml.trim());
fs.writeFileSync(path.join(publicDir, 'sitemap-keywords.xml'), keywordsXml.trim());
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), indexXml.trim());
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt.trim());

console.log('Successfully generated:');
console.log(' - /public/robots.txt');
console.log(' - /public/sitemap.xml (Index)');
console.log(` - /public/sitemap-pages.xml (${pages.length} pages)`);
console.log(` - /public/sitemap-categories.xml (${uniqueCategories.length} categories)`);
console.log(` - /public/sitemap-products.xml (${products.length} products)`);
console.log(` - /public/sitemap-blog.xml (${uniqueBlogSlugs.length} blog posts)`);
console.log(` - /public/sitemap-keywords.xml (${uniqueKeywordSlugs.length} keyword landings)`);
