import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseClient';
import { rateLimit } from '@/lib/rateLimit';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const rl = rateLimit(`user-profile:${ip}`, 10, 60_000);
    if (!rl.allowed) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const authHeader = request.headers.get('Authorization');
    const { uid, displayName, photoURL } = await request.json();

    if (!uid) {
      return NextResponse.json({ error: 'Missing uid' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user || user.id !== uid) {
      console.error('Auth verification failed:', authError?.message);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { error } = await supabase
      .from('users')
      .upsert(
        {
          auth_id: uid,
          email: user.email ?? null,
          display_name: typeof displayName === 'string' ? displayName : null,
          photo_url: typeof photoURL === 'string' ? photoURL : null,
          last_login: new Date().toISOString(),
        },
        { onConflict: 'auth_id' },
      );

    if (error) {
      console.error('Error upserting user profile:', error);
      return NextResponse.json({ error: 'Failed to save user profile' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('user-profile upsert failed:', error);
    return NextResponse.json(
      { error: 'Failed to save user profile' },
      { status: 500 }
    );
  }
}
