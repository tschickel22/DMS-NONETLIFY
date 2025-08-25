# pnpm Workspace & .gitignore Patch
Generated: 2025-08-25

This patch adds:
- `pnpm-workspace.yaml` to declare your multi-app workspace.
- A modern `.gitignore` suitable for Vite + Bolt + pnpm.
- Step-by-step commands to initialize, push to GitHub, and use pnpm locally and on Bolt.

## Apply
Unzip these files at the **root** of your restored repo (same folder as `apps/`, `public-site/`, `api/`).

## pnpm commands (local)
- Install all deps once at root:
  ```bash
  pnpm install
  ```

- Build everything (recursive):
  ```bash
  pnpm -r run build
  ```

- Build only a specific app (example: inventory-management):
  ```bash
  pnpm --filter ./apps/inventory-management run build
  ```

- Dev a specific app locally:
  ```bash
  pnpm --filter ./apps/inventory-management run dev
  ```

- Typecheck all packages:
  ```bash
  pnpm -r run typecheck
  ```

## Bolt hosting
- Keep per-app build command: `vite build`
- Output directory: `dist`
- API directory: `/api`
- Import `bolt.routes.json`
- Environment variables: copy from Netlify to Bolt

## New GitHub repo (from clean folder)
```bash
git init
git add -A
git commit -m "chore: add pnpm workspace and .gitignore"
git branch -M main
git remote add origin <YOUR_NEW_REPO_URL.git>
git push -u origin main
```
