// shared-core/http.ts
// Lightweight JSON & upload helpers with a safe default API base.

const API_BASE =
  (typeof import.meta !== 'undefined' && (import.meta as any)?.env?.VITE_FUNCTIONS_BASE) || '/api/netlify';

type HeadersLike = Record<string, string>;

function toHeaders(h?: HeadersLike): Headers {
  const out = new Headers();
  if (h) for (const [k, v] of Object.entries(h)) out.set(k, String(v));
  return out;
}

async function parseJSON<T = any>(res: Response): Promise<T> {
  const text = await res.text();
  try { return text ? JSON.parse(text) : ({} as any); }
  catch { throw new Error(text || `HTTP ${res.status}`); }
}

async function request<T = any>(method: string, path: string, body?: any, headers?: HeadersLike): Promise<T> {
  const url = path.startsWith('http') ? path : `${API_BASE}${path.startsWith('/') ? '' : '/'}${path}`;
  const h = toHeaders(headers);
  const init: RequestInit = { method, headers: h, credentials: 'include' };

  if (body != null && !(body instanceof FormData)) {
    if (!h.has('Content-Type')) h.set('Content-Type', 'application/json');
    init.body = JSON.stringify(body);
  } else if (body instanceof FormData) {
    init.body = body; // browser sets multipart boundary
  }

  const res = await fetch(url, init);
  if (!res.ok) throw new Error((await res.text()) || `${res.status} ${res.statusText}`);
  const ct = res.headers.get('content-type') || '';
  return ct.includes('application/json') ? parseJSON<T>(res) : ((await res.text()) as any);
}

export const http = {
  get:  <T = any>(p: string, h?: HeadersLike) => request<T>('GET', p, undefined, h),
  post: <T = any>(p: string, b?: any, h?: HeadersLike) => request<T>('POST', p, b, h),
  put:  <T = any>(p: string, b?: any, h?: HeadersLike) => request<T>('PUT', p, b, h),
  patch:<T = any>(p: string, b?: any, h?: HeadersLike) => request<T>('PATCH', p, b, h),
  del:  <T = any>(p: string, h?: HeadersLike) => request<T>('DELETE', p, undefined, h),
  upload:<T = any>(p: string, form: FormData, h?: HeadersLike) => request<T>('POST', p, form, h),
};

export { API_BASE };
