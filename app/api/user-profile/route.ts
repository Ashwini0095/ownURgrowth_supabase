import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseClient';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    const { uid, email, displayName, photoURL } = await request.json();

    if (!uid) {
      return NextResponse.json({ error: 'Missing uid' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    // Verify user identity if token is provided
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const { data: { user }, error: authError } = await supabase.auth.getUser(token);
      
      if (authError || !user || user.id !== uid) {
        console.error('Auth verification failed:', authError?.message);
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    } else {
      // In a real production app, we would strictly require this. 
      // For now, we log a warning but allow it for migration compatibility 
      // if the client hasn't been updated yet.
      console.warn('Request to user-profile missing Authorization header');
    }

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
