// Auto-generated wrapper for netlify/functions/landhome-demo.ts
// Route: /api/netlify/landhome-demo
type HandlerModule = { handler?: (event:any, context:any)=>Promise<any> } | any;
async function loadHandler(){
  const mod: HandlerModule = await import('../../netlify/functions/landhome-demo.ts');
  const h = (mod as any).handler ?? (mod as any).default?.handler ?? (mod as any).default;
  if (typeof h !== 'function') { throw new Error('No Netlify handler export in ../../netlify/functions/landhome-demo.ts'); }
  return h;
}
function toEvent(req:any, bodyText:string){
  const url = new URL(req.url, 'http://localhost');
  const headers:any = {};
  for (const [k,v] of Object.entries(req.headers || {})) { headers[k] = Array.isArray(v) ? v.join(', ') : (v ?? ''); }
  return { httpMethod: req.method, path: url.pathname, queryStringParameters: Object.fromEntries(url.searchParams.entries()), headers, body: bodyText, isBase64Encoded: false };
}
export default async function handler(req:any, res:any){
  try{
    let body = '';
    await new Promise<void>((resolve) => { req.on('data', (c:any) => body += c); req.on('end', () => resolve()); });
    const event = toEvent(req, body);
    const fn = await loadHandler();
    const result = await fn(event, {});
    const status = result?.statusCode ?? 200;
    const hdrs = result?.headers ?? {};
    for (const [k,v] of Object.entries(hdrs)) { if (v != null) res.setHeader(k, String(v)); }
    res.status(status).send(result?.body ?? '');
  } catch (err:any) {
    res.status(500).send(err?.message ?? 'Internal Error');
  }
}
