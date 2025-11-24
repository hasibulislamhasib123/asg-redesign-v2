**Purpose**
- **What:** Short, practical instructions to help AI coding agents be productive in this repo.
- **Where:** This monorepo-like layout holds a Vite React client, a small Express server, and shared code in `shared/`.

**Quick Architecture**
- **Client:** `client/` is a Vite React app. Entry: `client/src/main.tsx` -> `client/src/App.tsx`.
- **Server:** `server/index.ts` is a tiny Express static server that serves the built `dist/public` assets and falls back to `index.html` for client-side routes.
- **Shared:** Shared constants and types live in `shared/` and are imported via the alias `@shared`.
- **Build output:** `vite` builds client into `dist/public` (see `vite.config.ts`). The `build` script then bundles `server/index.ts` into `dist` using `esbuild`.

**How to run / build (discoverable commands)**
- Local dev (client) using Vite:
  ```powershell
  pnpm dev
  ```
- Full build (client + server bundle):
  ```powershell
  pnpm build
  ```
- Start production server (after `pnpm build`):
  - On PowerShell use:
    ```powershell
    $env:NODE_ENV = 'production'; node dist/index.js
    ```
  - `pnpm start` uses POSIX env syntax; on Windows it may fail unless run from a Unix-like shell or `cross-env` is used.
- Quick preview of the built client:
  ```powershell
  pnpm preview
  ```

**Key files and patterns to reference**
- `vite.config.ts` — important repo-wide settings:
  - `root` is `client/`, `build.outDir` -> `dist/public`.
  - Aliases: `@` -> `client/src`, `@shared` -> `shared/` (used across imports).
- `package.json` — scripts: `dev`, `build` (vite + esbuild), `start`, `preview`, `check` (tsc).
- `server/index.ts` — express static serving and client-side routing fallback.
- `tsconfig.json` — path mappings mirror Vite aliases; update both if adding aliases.

**Component / UI conventions**
- Components live under `client/src/components/` with UI primitives in `client/src/components/ui/`.
- Styling:
  - Tailwind CSS + utility-first classes; many components use `class-variance-authority` (`cva`) + `cn` helper from `client/src/lib/utils.ts`.
  - Example: `client/src/components/ui/button.tsx` — compose variants with `cva` and merge with `cn`.
- Theme handling: `client/src/contexts/ThemeContext.tsx` toggles the `dark` class on `document.documentElement`. Many styles rely on that.
- Import style: use aliases, e.g. `import { Button } from "@/components/ui/button";` (note the `@` alias).

**Project-specific quirks & gotchas**
- `pnpm` is the package manager (see `packageManager` in `package.json`). Use `pnpm install` to reproduce the environment.
- There's a pnpm patch for `wouter` at `patches/wouter@3.7.1.patch` and the patch is registered in `package.json` under `pnpm.patchedDependencies`. Be careful if changing router code or upgrading `wouter`.
- Environment files: `vite`'s `envDir` is the repository root. Vite expects `VITE_` prefixed env vars for client code (`VITE_APP_TITLE`, `VITE_OAUTH_PORTAL_URL`, etc.).
- Windows env vars: `package.json` scripts use `NODE_ENV=production` (POSIX). For cross-platform CI/local runs, either use `cross-env` or set env vars with the platform's syntax (PowerShell example above).

**Where to look for common tasks**
- Add a new alias: update both `vite.config.ts` and `tsconfig.json` `paths`.
- Create a new page/route: add a component under `client/src/pages/` and add a `Route` in `client/src/App.tsx` (this project uses `wouter`).
- Add shared constants/types: put them in `shared/` and import via `@shared`.

**Testing & type checks**
- Type check: `pnpm run check` runs `tsc --noEmit` for the whole repo (includes `client`, `server`, `shared`).
- Tests: no automated test runner configured in the repo root; `vitest` is present in `devDependencies` but no scripts are provided — search for `*.test.*` files before adding test scaffolding.

**What an AI agent should do first**
1. Read `vite.config.ts` and `package.json` to understand aliases and scripts.
2. Inspect `client/src/App.tsx`, `server/index.ts`, and `shared/` to learn data flow and shared contracts.
3. Follow the component pattern shown in `client/src/components/ui/*` (use `cva` + `cn`, keep Tailwind utility classes).
4. Double-check `patches/` and `pnpm.patchedDependencies` before changing router-related code.

**If you change runtime/server behavior**
- Update `server/index.ts` and re-run `pnpm build` (bundles client, then bundles server into `dist`).
- Validate that `dist/public/index.html` exists and that `server` serves static files from `dist/public` in dev vs production.

---
If anything here is unclear or you'd like more examples (component patterns, a checklist for landing PRs, or CI commands), tell me which area to expand.
