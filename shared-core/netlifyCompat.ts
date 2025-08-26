// shared-core/netlifyCompat.ts
// Global fetch shim to rewrite calls that still target Netlify endpoints.
// Any same-origin URL with path "/.netlify/functions/*" is rewritten to "/api/netlify/*".
// Import this once in each app entry file (e.g., apps/*/src/main.tsx).

if (typeof window !== 'undefined' && typeof window.fetch === 'function') {
  const originalFetch = window.fetch.bind(window);

  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    let req = input as any;
    try {
      let urlStr: string | null = null;

      if (typeof req === 'string') {
        urlStr = req;
      } else if (req instanceof URL) {
        urlStr = req.toString();
      } else if (req && typeof (req as any).url === 'string') {
        urlStr = (req as any).url;
      }

      if (urlStr) {
        const u = new URL(urlStr, window.location.origin);
        // Only rewrite same-origin requests
        if (u.origin === window.location.origin && u.pathname.startsWith('/.netlify/functions/')) {
          u.pathname = u.pathname.replace('/.netlify/functions/', '/api/netlify/');
          const newUrl = u.toString();
          if (req instanceof Request) {
            req = new Request(newUrl, req);
          } else {
            req = newUrl as any;
          }
        }
      }

      return await originalFetch(req, init as any);
    } catch (err) {
      return Promise.reject(err);
    }
  };
}
