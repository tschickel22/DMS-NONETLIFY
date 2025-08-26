import fs from 'fs';
import path from 'path';

const repo = process.cwd();
const skipDirs = new Set(['.git','node_modules','dist','build','.next','.nuxt','.svelte-kit','.vercel','.netlify','api']);

const netlifyFuncs = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!skipDirs.has(entry.name)) walk(p);
    } else {
      const norm = p.replace(/\\/g,'/');
      if (norm.includes('/netlify/functions/') && /\.(m?jsx?|tsx?)$/.test(entry.name)) {
        netlifyFuncs.push(norm);
      }
    }
  }
}

walk(repo);
fs.mkdirSync(path.join(repo,'api','netlify'), { recursive: true });

const created = [];
for (const src of netlifyFuncs) {
  const base = path.basename(src).replace(/\.(tsx?|mjs|cjs|jsx)$/, '');
  let wrapper = path.join(repo,'api','netlify', `${base}.ts`);
  let n = 1;
  while (fs.existsSync(wrapper)) {
    const alt = path.join(repo,'api','netlify', `${base}-${n}.ts`);
    if (!fs.existsSync(alt)) { wrapper = alt; break; }
    n++;
  }
  const rel = path.relative(path.dirname(wrapper), src).replace(/\\/g,'/');
  const nameForRoute = path.basename(wrapper, '.ts');
  const code = `// Auto-generated wrapper for ${path.relative(repo,src).replace(/\\/g,'/')}
// Route: /api/netlify/${nameForRoute}
type HandlerModule = { handler?: (event:any, context:any)=>Promise<any> } | any;
async function loadHandler(){
  const mod: HandlerModule = await import('${rel}');
  const h = mod?.handler || mod?.default?.handler || mod?.default;
  if (typeof h !== 'function') throw new Error('No Netlify handler export in ${rel}');
  return h;
}
function toEvent(req:any, bodyText:string){
  const url = new URL(req.url, 'http://localhost');
  const headers:any = {};
  for (const [k,v] of Object.entries(req.headers||{})){ headers[k]=Array.isArray(v)?v.join(', '):(v??''); }
  return { httpMethod:req.method, path:url.pathname, queryStringParameters:Object.fromEntries(url.searchParams.entries()), headers, body:bodyText, isBase64Encoded:false };
}
export default async function handler(req:any,res:any){
  try{
    let body=''; await new Promise<void>(r=>{ req.on('data',(c:any)=>body+=c); req.on('end',()=>r()); });
    const event = toEvent(req, body);
    const fn = await loadHandler();
    const result = await fn(event, {});
    const status = result?.statusCode ?? 200;
    const hdrs = result?.headers ?? {};
    for (const [k,v] of Object.entries(hdrs)){ if(v!=null) res.setHeader(k,String(v)); }
    res.status(status).send(result?.body ?? '');
  }catch(err:any){
    res.status(500).send(err?.message ?? 'Internal Error');
  }
}
`;
  fs.writeFileSync(wrapper, code);
  created.push({ src, wrapper: path.relative(repo, wrapper) });
}

console.log(JSON.stringify({ count: created.length, created }, null, 2));
