import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseClient';

/**
 * Hard-purge a user. Wipes every per-user row across the app's tables and then
 * deletes the auth user. After this runs, the same email signing in again is
 * indistinguishable from a brand-new user.
 *
 * Auth (either is sufficient):
 *   - `x-admin-key: <ADMIN_API_KEY>` header — for curl/scripts.
 *   - Supabase `Authorization: Bearer <jwt>` from a user whose email is listed
 *     in the comma-separated ADMIN_EMAILS env var — for the admin UI.
 *
 * Body: { email?: string, userId?: string } — at least one is required.
 */
export async function POST(request: NextRequest) {
  const supabase = getSupabaseAdmin();

  // ── Authorize: x-admin-key header OR admin-allowlisted Supabase JWT ──────
  const adminKey = process.env.ADMIN_API_KEY;
  const providedKey = request.headers.get('x-admin-key');
  const keyMatches = !!adminKey && providedKey === adminKey;

  let jwtAdminMatches = false;
  if (!keyMatches) {
    const authHeader = request.headers.get('Authorization') ?? '';
    if (authHeader.startsWith('Bearer ')) {
      const token = authHeader.slice('Bearer '.length);
      const { data, error } = await supabase.auth.getUser(token);
      const callerEmail = data?.user?.email?.toLowerCase();
      const allowlist = (process.env.ADMIN_EMAILS ?? '')
        .split(',')
        .map((e) => e.trim().toLowerCase())
        .filter(Boolean);
      if (!error && callerEmail && allowlist.includes(callerEmail)) {
        jwtAdminMatches = true;
      }
    }
  }

  if (!keyMatches && !jwtAdminMatches) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: { email?: string; userId?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { email, userId: providedUserId } = body;
  if (!email && !providedUserId) {
    return NextResponse.json(
      { error: 'Provide email or userId' },
      { status: 400 }
    );
  }

  // Resolve user_id from email if only email was given. Supabase admin API
  // doesn't expose a direct "get user by email", so we page through users.
  let userId = providedUserId ?? null;
  let resolvedEmail = email ?? null;

  if (!userId && email) {
    let page = 1;
    const perPage = 1000;
    while (true) {
      const { data, error } = await supabase.auth.admin.listUsers({
        page,
        perPage,
      });
      if (error) {
        return NextResponse.json(
          { error: `Failed to list users: ${error.message}` },
          { status: 500 }
        );
      }
      const match = data.users.find(
        (u) => u.email?.toLowerCase() === email.toLowerCase()
      );
      if (match) {
        userId = match.id;
        resolvedEmail = match.email ?? email;
        break;
      }
      if (data.users.length < perPage) break;
      page += 1;
    }
  }

  if (!resolvedEmail && userId) {
    const { data, error } = await supabase.auth.admin.getUserById(userId);
    if (!error) resolvedEmail = data.user?.email ?? null;
  }

  const summary = {
    userId,
    email: resolvedEmail,
    deleted: {
      payments_by_user_id: 0,
      payments_by_email: 0,
      purchases: 0,
      user_sessions: 0,
      users_profile: 0,
      auth_user: false,
    },
    errors: [] as string[],
  };

  // payments — delete by user_id and by email so old orphaned rows go too
  if (userId) {
    const { count, error } = await supabase
      .from('payments')
      .delete({ count: 'exact' })
      .eq('user_id', userId);
    if (error) summary.errors.push(`payments(user_id): ${error.message}`);
    else summary.deleted.payments_by_user_id = count ?? 0;
  }
  if (resolvedEmail) {
    const { count, error } = await supabase
      .from('payments')
      .delete({ count: 'exact' })
      .eq('user_email', resolvedEmail);
    if (error) summary.errors.push(`payments(email): ${error.message}`);
    else summary.deleted.payments_by_email = count ?? 0;
  }

  // legacy purchases table (if present)
  if (userId) {
    const { count, error } = await supabase
      .from('purchases')
      .delete({ count: 'exact' })
      .eq('user_id', userId);
    if (error && !/relation .* does not exist/i.test(error.message)) {
      summary.errors.push(`purchases: ${error.message}`);
    } else {
      summary.deleted.purchases = count ?? 0;
    }
  }

  // user_sessions
  if (userId) {
    const { count, error } = await supabase
      .from('user_sessions')
      .delete({ count: 'exact' })
      .eq('user_id', userId);
    if (error) summary.errors.push(`user_sessions: ${error.message}`);
    else summary.deleted.user_sessions = count ?? 0;
  }

  // users (app profile table, keyed by auth_id)
  if (userId) {
    const { count, error } = await supabase
      .from('users')
      .delete({ count: 'exact' })
      .eq('auth_id', userId);
    if (error) summary.errors.push(`users: ${error.message}`);
    else summary.deleted.users_profile = count ?? 0;
  }

  // auth.users — last, so foreign-key cleanup above runs first
  if (userId) {
    const { error } = await supabase.auth.admin.deleteUser(userId);
    if (error) summary.errors.push(`auth.users: ${error.message}`);
    else summary.deleted.auth_user = true;
  }

  if (!userId && resolvedEmail) {
    summary.errors.push('No auth user found for that email — only DB rows touched.');
  }

  const ok = summary.errors.length === 0;
  return NextResponse.json(summary, { status: ok ? 200 : 207 });
}
