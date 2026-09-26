# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Dev server with Turbopack on :3000
npm run build     # Production build
npm run lint      # ESLint
```

No test framework is configured.

## Architecture

SpendWise is a personal finance app using **Next.js 15 App Router**, **React 19**, **TypeScript (strict)**, and **Supabase** (PostgreSQL + Auth + Realtime).

**Path alias:** `@/*` maps to `src/*`

### Data flow pattern: Service → Hook → Component

- **Services** (`src/services/`) make Supabase client calls directly. Each service creates its own Supabase client via `createClient()` from `@/lib/supabase/client.ts`.
- **Hooks** (`src/hooks/use-*.ts`) wrap services with React state (loading, error, data). Components use hooks, never services directly.
- **Types** (`src/types/`) define DB schema types, exported via barrel `index.ts`.

### Auth

Supabase Auth with middleware-based route protection (`src/middleware.ts`). Uses `@supabase/auth-helpers-nextjs` for session management. Public routes: `/auth/*`. Everything else requires a session and redirects to `/auth/login` if unauthenticated.

### AI Integration

OpenAI-powered transaction parsing via API route at `src/app/api/ai/parse-transaction/route.ts`. The `OPENAI_API_KEY` env var is server-only. Natural language text is sent from the client to this route, which returns structured transaction data.

### UI

- **shadcn/ui** components in `src/components/ui/` (Radix UI + Tailwind)
- Use `cn()` from `@/lib/utils` for conditional class merging
- Dark mode via class-based Tailwind (`next-themes` provider)
- HSL CSS variables for theming in `src/styles/globals.css`

### Realtime

Supabase Realtime subscriptions in services (e.g., `transactionsService.subscribeToChanges`) push live updates to hooks.

## Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL (browser-exposed)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anon key (browser-exposed)
- `OPENAI_API_KEY` — OpenAI API key (server-only)

## Conventions

- Code comments and UI strings are in **Spanish**
- Feature pages live under `src/app/dashboard/[feature]/page.tsx`
- Dashboard-specific components go in `src/app/dashboard/components/`
- Shared/reusable components go in `src/components/`
