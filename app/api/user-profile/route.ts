import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseClient';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const { uid, email, displayName, photoURL } = await request.json();

    if (!uid) {
      return NextResponse.json({ error: 'Missing uid' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    // Check if user exists
    const { data: existing } = await supabase
      .from('users')
      .select('id')
      .eq('auth_id', uid)
      .single();

    if (existing) {
      // Update existing user
      const { error } = await supabase
        .from('users')
        .update({
          email: email ?? null,
          display_name: displayName ?? null,
          photo_url: photoURL ?? null,
          last_login: new Date().toISOString(),
        })
        .eq('auth_id', uid);

      if (error) console.error('Error updating user profile:', error);
    } else {
      // Insert new user
      const { error } = await supabase.from('users').insert({
        auth_id: uid,
        email: email ?? null,
        display_name: displayName ?? null,
        photo_url: photoURL ?? null,
        last_login: new Date().toISOString(),
      });

      if (error) console.error('Error inserting user profile:', error);
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
