# Renter Insight — Bolt-Ready Restore
Generated: 2025-08-25

This archive was rebuilt from your Backup A and prepped for Bolt hosting.
Key changes:
- Removed built artifacts and vendor caches (dist, node_modules, .netlify, etc.).
- Added **api/netlify/** wrappers for every Netlify function detected anywhere in the repo.
- Added **bolt.routes.json** to map:
  - `/.netlify/functions/*` → `/api/netlify/*` (compat)
  - `/api/*` → Bolt API handlers
  - SPA fallback for app routes and `/s/:site/*`
- Added **renter_insight_bolt_manifest.json** enumerating apps under `apps/*`.

## Deploy Steps
1. Create a new GitHub repo and push this archive's contents.
2. In Bolt:
   - Connect the repo.
   - Set per-app build: `vite build`, output: `dist`.
   - API directory: `/api`
   - Import `bolt.routes.json` (or enable equivalent routes manually).
   - Copy your environment variables from Netlify to Bolt.
3. Build & deploy. Your former Netlify endpoints are available under:
   - `/.netlify/functions/<name>` (auto-redirects to `/api/netlify/...`)
   - `/api/netlify/...` (direct path mirroring the original function locations)

## Notes
- If any function does not export `exports.handler` (or default handler), adjust its wrapper in `api/netlify/...` accordingly.
- Over time, you may convert functions to native Bolt format and delete the wrappers.
