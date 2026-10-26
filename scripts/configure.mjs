// Use the final public base URL; trailing slash is normalized. No source paths change.
import {readFile,writeFile,mkdir} from 'node:fs/promises';
const input=process.argv[2];if(!input){console.error('Usage: npm run configure -- https://OWNER.github.io/REPOSITORY/');process.exit(1);}
const u=new URL(input);if(!['http:','https:'].includes(u.protocol)||u.search||u.hash){throw Error('Provide a public HTTP(S) base URL without query or hash.');}u.pathname=u.pathname.replace(/\/?$/,'/');const base=u.href;
for(const f of ['index.html','gear.html','privacy.html','404.html']){
 let s=await readFile(f,'utf8');
 s=s.replace(/(<meta name="site-base" content=")[^"]+("\s*\/?>)/,`$1${base}$2`);const canonical=f==='index.html'?base:base+f;
 s=s.replace(/(<base href=")[^"]+("\s*\/?>)/,`$1${base}$2`);
 s=s.replace(/(<link rel="canonical" href=")[^"]+("\s*\/?>)/,`$1${canonical}$2`);
 s=s.replace(/(<meta property="og:url" content=")[^"]+("\s*\/?>)/,`$1${canonical}$2`);
 s=s.replace(/(<meta property="og:image" content=")[^"]+("\s*\/?>)/,`$1${base}assets/images/social-preview.jpg$2`);
 s=s.replace(/(<meta name="twitter:image" content=")[^"]+("\s*\/?>)/,`$1${base}assets/images/social-preview.jpg$2`);
 if(f==='index.html'){
  s=s.replace(/(<meta property="og:url" content=")[^"]+("\s*\/?>)/,`$1${base}$2`);
  s=s.replace(/(<meta property="og:image" content=")[^"]+("\s*\/?>)/,`$1${base}assets/images/social-preview.jpg$2`);
  s=s.replace(/(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/,(_,a,j,b)=>{const data=JSON.parse(j);data.url=base;data.image=base+'assets/images/social-preview.jpg';return a+JSON.stringify(data)+b;});
 }
 await writeFile(f,s);
}
await writeFile('sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${['','gear.html','privacy.html'].map(p=>`  <url><loc>${(base+p).replaceAll('&','&amp;')}</loc></url>`).join('\n')}\n</urlset>\n`);
await writeFile('robots.txt',`User-agent: *\nAllow: /\nSitemap: ${base}sitemap.xml\n`);
console.log('SEO URLs configured for '+base);

const legacy={home:'',story:'#rooms',gear:'gear.html',staff:'#people',gallery:'#gallery',contact:'#contact',sample:'#listen',mixing:'#contact',mastering:'?room=master#rooms'};
for(const [route,target] of Object.entries(legacy)) {
 await mkdir(route,{recursive:true});
 const destination='../index.html'+(target==='gear.html'?'':target);
 const href=target==='gear.html'?'../gear.html':destination;
 const canonical=target==='gear.html'?base+'gear.html':base;
 await writeFile(`${route}/index.html`,`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="refresh" content="0;url=${href}"><link rel="canonical" href="${canonical}"><title>The Church Recording Studio</title><link rel="stylesheet" href="../assets/style.css"></head><body><main class="document"><h1>The Church</h1><p>This part of the studio has a new home. <a href="${href}">Continue to the studio</a>.</p></main></body></html>`);
}
