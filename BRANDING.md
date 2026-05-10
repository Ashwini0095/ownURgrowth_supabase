# Custom-Branded Google Sign-In (no Supabase Pro plan)

## Goal
Show **`ownurgrowth.com`** on Google's "Choose an account / continue to …" screen instead of the raw Supabase project URL — without paying for Supabase's custom-domain add-on.

## How it works
Skip Supabase's OAuth redirect entirely. Use **Google Identity Services (GIS)** to obtain a signed Google **ID token (JWT)** directly on your domain, then exchange it with Supabase via `supabase.auth.signInWithIdToken`. Google's redirect_uri is your domain, so its consent screen reads "to continue to ownurgrowth.com".

The flow is bound by a one-time **nonce**: a 32-byte random value is hashed (SHA-256) and sent to Google, which echoes the hash back inside the JWT's `nonce` claim. Supabase recomputes the hash from the raw nonce we send it and refuses the token if it doesn't match — preventing token replay.

---

## Step 1 — Google Cloud Console

1. https://console.cloud.google.com → your project.
2. **APIs & Services → Credentials → OAuth 2.0 Client ID** (or create a new "Web application").
3. **Authorized JavaScript origins** — add **all** of:
   ```
   https://ownurgrowth.com
   https://www.ownurgrowth.com
   http://localhost:3000
   ```
4. **Authorized redirect URIs** — keep your existing Supabase callback so server-side OAuth still works as a fallback:
   ```
   https://vtvmhmeutcxjrgnqatkn.supabase.co/auth/v1/callback
   ```
   (No new redirect URI needed for the GIS flow — it uses `postMessage`, not redirects.)
5. **OAuth consent screen** → set App name = `ownURgrowth`, upload logo, set homepage = `https://ownurgrowth.com`, privacy + terms URLs. This is what Google shows above the account list.
6. Copy the **Client ID** (looks like `1234567890-abc….apps.googleusercontent.com`).

---

## Step 2 — Environment variables

Add to `.env.local` and to Vercel project env:

```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com
```

(You already have `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.)

---

## Step 3 — Supabase Dashboard

1. **Authentication → URL Configuration**
   - Site URL: `https://ownurgrowth.com`
   - Redirect URLs: add `https://ownurgrowth.com`, `https://www.ownurgrowth.com`, `http://localhost:3000`
2. **Authentication → Providers → Google**
   - Enabled: ✅
   - Client ID: same one from Step 1
   - Client Secret: your Google OAuth client secret
   - **Skip nonce check**: leave **OFF** (we send a nonce — Supabase must verify it).
   - **Authorized Client IDs**: paste your Client ID here too. This tells Supabase to accept ID tokens whose `aud` claim matches.

---

## Step 4 — Code (already wired in this repo)

- `components/GoogleSignInButton.tsx` — loads GIS, generates a per-mount nonce, renders Google's official button, calls `signInWithGoogleIdToken` on credential.
- `lib/auth-utils.ts` → `signInWithGoogleIdToken(credential, rawNonce)` exchanges the JWT for a Supabase session.
- `next.config.js` — CSP allows `accounts.google.com/gsi/*` for script, style, frame, and connect.

The login + signup pages already render `<GoogleSignInButton />` so no UI changes were needed.

---

## Security properties

| Concern | Mitigation |
|---|---|
| Token replay | Nonce: SHA-256 hash sent to Google, raw value verified by Supabase. Burned after one use. |
| Token theft via XSS | Existing CSP + `httpOnly` cookies (Supabase JS already uses local storage — separate hardening). |
| Phishing via fake redirect | No redirects in the GIS credential flow — Google only talks to origins you registered in Step 1. |
| Cross-site request forgery | Google's GIS popup is gated by `postMessage` origin check. |
| Brute force on `/api/user-profile` | Already rate-limited (10 req/min per IP) via `lib/rateLimit.ts`. |
| Supabase service-role key leakage | Stays server-side only in `getSupabaseAdmin()`; never imported into client components. |

---

## Verification

1. `npm run dev`
2. Open http://localhost:3000/login → click the Google button → consent screen should say **"to continue to localhost"** (not the supabase URL).
3. After deploy: visit `https://ownurgrowth.com/login` → consent screen should say **"to continue to ownurgrowth.com"**.
4. In Supabase Dashboard → Authentication → Users, confirm a new row is created with `provider = google` after a fresh sign-in.

---

## Rollback

If anything breaks, the old `signInWithGoogle` (server-side OAuth via Supabase) is still exported from `lib/auth-utils.ts`. Swap it back into `GoogleSignInButton.tsx` to restore the original flow.
