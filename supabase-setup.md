# Supabase Project Setup — ownURgrowth

This document is the one-stop guide for spinning up a fresh Supabase project for
ownURgrowth. It contains:

1. The project-creation checklist (dashboard settings)
2. The full schema + RLS SQL to paste into the SQL editor
3. A code-call → table → policy mapping so you can verify nothing is missed
4. Post-SQL configuration steps (auth, env vars, smoke tests)

If you are migrating from an older Supabase project, follow this end-to-end on
the **new** project before swapping the env vars in production.

---

## 1. Create the project

When creating the project in the Supabase dashboard:

| Field | Value | Why |
|---|---|---|
| Project name | `ownURgrowth` | — |
| Region | Asia-Pacific | Closest to your users in India |
| Database password | Strong; save in 1Password **before** clicking create | Supabase will not show it again |
| **Enable Data API** | ✅ on | The browser uses `supabase-js` directly (auth, sessions, reviews) |
| **Automatically expose new tables** | ✅ on | Convenient while bootstrapping; RLS still locks rows down |
| **Enable automatic RLS** | ✅ on | **Critical.** Without this, the anon key in your JS bundle would let any visitor read every table |

> The anon key ships in your client bundle. RLS is the **only** thing standing
> between a visitor's browser console and your `payments` table. Never disable it.

---

## 2. Schema + RLS SQL

Paste the entire block below into **SQL Editor → New query → Run**.

It is idempotent-friendly enough for a fresh project: it assumes empty tables
and does not include `if not exists` guards (run it on a new project only).

```sql
-- ════════════════════════════════════════════════════════════════════════════
-- ownURgrowth — schema + RLS
-- Run in Supabase SQL Editor on a fresh project.
-- "Enable automatic RLS" should be ON, but we ALTER ... ENABLE ROW LEVEL
-- SECURITY explicitly to be safe if the project-level toggle was missed.
-- ════════════════════════════════════════════════════════════════════════════

-- ── 1. users (app-side profile mirror, keyed off auth.users) ────────────────
create table public.users (
  auth_id      uuid primary key references auth.users(id) on delete cascade,
  email        text,
  display_name text,
  photo_url    text,
  last_login   timestamptz default now(),
  created_at   timestamptz not null default now()
);

create index users_email_idx on public.users (lower(email));

-- ── 2. user_sessions (2-device-limit enforcement, written from browser) ─────
create table public.user_sessions (
  id            text primary key,                -- "<uid>_<ts>_<rand>"
  user_id       uuid not null references auth.users(id) on delete cascade,
  device_info   text,
  login_time    timestamptz not null default now(),
  last_activity timestamptz not null default now()
);

create index user_sessions_user_id_idx on public.user_sessions (user_id);

-- ── 3. purchases (lightweight per-course access record) ─────────────────────
create table public.purchases (
  id           bigserial primary key,
  user_id      uuid not null references auth.users(id) on delete cascade,
  course_id    text not null,
  payment_id   text,
  purchased_at timestamptz not null default now(),
  unique (user_id, course_id)
);

create index purchases_user_id_idx on public.purchases (user_id);

-- ── 4. payments (Razorpay records — server-side only via service role) ──────
create table public.payments (
  id                   bigserial primary key,
  user_id              uuid references auth.users(id) on delete set null,
  user_email           text,
  user_name            text,
  course_name          text,
  plan_name            text,
  amount               numeric(10, 2),
  razorpay_order_id    text,
  razorpay_payment_id  text unique,              -- upsert key in verify-payment
  status               text not null default 'pending',
  upgrade_to           text,
  is_upgrade           boolean default false,
  created_at           timestamptz not null default now()
);

create index payments_user_id_idx     on public.payments (user_id);
create index payments_user_email_idx  on public.payments (lower(user_email));

-- ── 5. reviews (client-side insert from CourseReviewPopup) ──────────────────
create table public.reviews (
  id          bigserial primary key,
  user_id     uuid not null references auth.users(id) on delete cascade,
  user_name   text,
  user_email  text,
  stars       text not null,
  review      text,
  course_id   text not null,
  created_at  timestamptz not null default now()
);

create index reviews_course_id_idx on public.reviews (course_id);


-- ════════════════════════════════════════════════════════════════════════════
-- RLS — enable on every table, then add the minimum-needed policies.
-- The service role (used by your Next.js API routes) BYPASSES all of these.
-- ════════════════════════════════════════════════════════════════════════════

alter table public.users         enable row level security;
alter table public.user_sessions enable row level security;
alter table public.purchases     enable row level security;
alter table public.payments      enable row level security;
alter table public.reviews       enable row level security;

-- ── users: server-only (no client policies). Service role handles all writes.
-- (No policies needed — RLS-on with no policy = deny-all to anon/authenticated.)

-- ── user_sessions: a logged-in user can fully manage their own rows. ────────
create policy "user_sessions: read own"
  on public.user_sessions for select
  to authenticated
  using (user_id = auth.uid());

create policy "user_sessions: insert own"
  on public.user_sessions for insert
  to authenticated
  with check (user_id = auth.uid());

create policy "user_sessions: update own"
  on public.user_sessions for update
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "user_sessions: delete own"
  on public.user_sessions for delete
  to authenticated
  using (user_id = auth.uid());

-- ── purchases: user can read own, insert own. No client-side update/delete. ─
create policy "purchases: read own"
  on public.purchases for select
  to authenticated
  using (user_id = auth.uid());

create policy "purchases: insert own"
  on public.purchases for insert
  to authenticated
  with check (user_id = auth.uid());

-- ── payments: server-only. No client policies = deny all to anon/auth. ──────
-- (verify-payment + check-purchase use the service role key.)

-- ── reviews: signed-in users can post their own; anyone can read. ───────────
create policy "reviews: read all"
  on public.reviews for select
  to anon, authenticated
  using (true);

create policy "reviews: insert own"
  on public.reviews for insert
  to authenticated
  with check (user_id = auth.uid());
```

---

## 3. Why these tables / why these policies

The schema mirrors exactly what the codebase already touches. Nothing
speculative — every column is referenced by real code on `fix/migrating-to-supabase`.

### `users` — app profile mirror

- Written only by `app/api/user-profile/route.ts` via the service role.
- Keyed by `auth_id` (the Supabase Auth user id). Cascade-deletes on auth user
  removal so `admin/purge-user` cleanup stays clean.
- **No client policies.** RLS-on with zero policies means anon and authenticated
  roles get nothing. The server uses the service role, which bypasses RLS.

### `user_sessions` — browser-managed 2-device cap

- Read/written from `lib/sessionManager.ts` directly with the anon key.
- The `id` column is a string like `<uid>_<timestamp>_<random>` — text, not uuid.
- Policies grant **own-row** read/insert/update/delete for `authenticated`.
  `auth.uid()` returns the JWT subject, which must match `user_id`.

### `purchases` — per-course access record

- `lib/purchases.ts` inserts and reads from the browser.
- `unique (user_id, course_id)` prevents duplicate access rows for the same
  course.
- Policies: own-row read + insert. No client update/delete (we never need them
  from the client; admin purge uses the service role).

### `payments` — Razorpay records

- Touched only by server routes (`verify-payment`, `check-purchase`,
  `admin/purge-user`) using the service role.
- `razorpay_payment_id` is unique because `verify-payment` does
  `.upsert(..., { onConflict: 'razorpay_payment_id' })`.
- `upgrade_to` and `is_upgrade` carry the plan-upgrade signal that
  `check-purchase` reads when computing the user's effective plan.
- **No client policies.** Anon/authenticated roles cannot see this table at all.

### `reviews` — course rating popup

- Inserted from `components/CourseReviewPopup.tsx` (browser, anon key).
- `stars` is text in the existing code (`String(rating)`); kept as text to avoid
  changing client code. If you later want to aggregate, add a generated
  `stars_int` column or migrate the column type.
- Policies: anyone can read (so a future "show reviews" feature works without
  schema changes); authenticated users can insert only their own row.

### Code-call → table → policy map

| Code | Table | Works because |
|---|---|---|
| `sessionManager.ts` insert/select/update/delete | `user_sessions` | own-row policies for `authenticated` |
| `purchases.ts` insert/select | `purchases` | own-row policies |
| `CourseReviewPopup.tsx` insert | `reviews` | insert-own + read-all policies |
| `app/api/verify-payment` upsert | `payments` | service role bypasses RLS |
| `app/api/check-purchase` select | `payments` | service role bypasses RLS |
| `app/api/user-profile` upsert | `users` | service role bypasses RLS |
| `app/api/admin/purge-user` deletes | all | service role bypasses RLS |

---

## 4. Post-SQL configuration

Run through this list in order. Skipping any step will break a real user flow.

### 4.1. Auth → URL Configuration

- **Site URL**: production domain (e.g. `https://ownurgrowth.com`)
- **Redirect URLs**: add both
  - `http://localhost:3000/**`
  - `https://<your-prod-domain>/**`

Without these, magic links and OAuth callbacks land on a Supabase error page.

### 4.2. Auth → Providers

- **Email**: enable. Confirm-email template should link to your prod domain.
- **Google**: enable if you use `signInWithOAuth` (`lib/auth-utils.ts:5`). Paste
  the Google OAuth client id + secret from Google Cloud Console. Add Supabase's
  callback URL to the Google "Authorized redirect URIs" list.

### 4.3. Auth → Email Templates

- Confirmation, magic link, recovery: replace any default `localhost` URLs with
  your domain. Keep the `{{ .ConfirmationURL }}` placeholder.

### 4.4. Project Settings → API

Copy these into `.env.local` (and into Vercel / your prod platform):

```env
NEXT_PUBLIC_SUPABASE_URL=https://<new-project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<new anon key>
SUPABASE_SERVICE_ROLE_KEY=<new service_role key>
INTERNAL_API_SECRET=<random 32+ byte server-only secret>
BUNNY_STREAM_TOKEN_SECURITY_KEY=<Bunny Stream embed token authentication key>
BUNNY_STREAM_LIBRARY_ID=<Bunny Stream library id>
BUNNY_STREAM_VIDEO_ID=<Bunny Stream video id>
BUNNY_STREAM_ALLOWED_VIDEO_IDS=<optional comma-separated video ids>
```

> The service-role key is a god-mode credential. It must never be committed,
> never sent to the browser, and never logged. Vercel's env-var UI is fine.

`INTERNAL_API_SECRET` protects the receipt email route so only verified server
payment code can call it. Bunny Stream embed token authentication must be
enabled in Bunny before production traffic uses the protected video player.

### 4.5. Smoke test the golden path

Before flipping production traffic to the new project:

1. Sign up with a fresh email → confirm via email link → log in.
2. From `/profile`, update display name → confirms `users` upsert + auth update.
3. Buy the cheapest plan with a Razorpay test card → confirms `payments` insert
   in `verify-payment` and the receipt email.
4. Reload `/linkedin-growth` → confirms `check-purchase` reads `payments`
   correctly and unlocks the course.
5. Submit a course review → confirms `reviews` insert under RLS.
6. Sign in on a third device → confirms `user_sessions` evicts the oldest of
   the prior two.
7. (Admin only) From `/admin`, purge the test account → confirms cascade
   deletes work end-to-end.

If any step fails with `permission denied for table ...` or `new row violates
row-level security policy`, the policy for that table did not match the call.
Check the code-call → policy map above.

---

## 5. Data migration (optional)

If you need to bring users and payments from the old Supabase project:

- **`auth.users`**: there is no clean export-import for hashed passwords across
  projects. Easiest path is to invite users by email on the new project (they
  reset password). Service-role admin API can also bulk-create users with
  `email_confirm: true`.
- **`payments`**: export as CSV from old project SQL editor (`select * from
  public.payments`), then import via Table editor or `\copy`. Make sure
  `user_id` values still resolve — if you re-create users with new ids, you'll
  need to remap by `user_email`.
- **`users` / `purchases` / `reviews`**: same approach — CSV export → CSV
  import, remap `user_id`/`auth_id` if user ids changed.
- **`user_sessions`**: don't migrate. Let users sign in fresh; old session rows
  are device-bound and expire on their own.
