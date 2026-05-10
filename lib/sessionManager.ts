import { supabase } from './supabaseClient';

export interface UserSession {
  id: string;
  user_id: string;
  device_info: string;
  login_time: string;
  last_activity: string;
}

const SESSION_ACTIVITY_THROTTLE_MS = 5 * 60 * 1000; // 5 minutes
let lastActivityUpdate = 0;

export async function createUserSession(userId: string): Promise<boolean> {
  try {
    // Generate unique session ID
    const sessionId = `${userId}_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;

    // Get device info
    const deviceInfo = `${navigator.userAgent.slice(0, 100)} - ${new Date().toISOString()}`;

    // Check existing sessions
    const { data: sessions, error: fetchError } = await supabase
      .from('user_sessions')
      .select('*')
      .eq('user_id', userId);

    if (fetchError) {
      console.error('Error fetching sessions:', fetchError);
      // Continue anyway — don't block login
    }

    const now = new Date();
    const activeSessions = (sessions || []).filter((s) => {
      const lastActivity = new Date(s.last_activity);
      // Consider session active if last activity was within 30 minutes
      return now.getTime() - lastActivity.getTime() < 30 * 60 * 1000;
    });

    // If 2 or more active sessions, remove oldest
    if (activeSessions.length >= 2) {
      const oldest = activeSessions.sort(
        (a, b) => new Date(a.last_activity).getTime() - new Date(b.last_activity).getTime()
      )[0];

      await supabase.from('user_sessions').delete().eq('id', oldest.id);
    }

    // Create new session
    const { error: insertError } = await supabase.from('user_sessions').insert({
      id: sessionId,
      user_id: userId,
      device_info: deviceInfo,
      login_time: new Date().toISOString(),
      last_activity: new Date().toISOString(),
    });

    if (insertError) {
      console.error('Error creating session:', insertError);
      return false;
    }

    // Store session ID locally
    localStorage.setItem('sessionId', sessionId);

    return true;
  } catch (error) {
    console.error('Error creating user session:', error);
    return false;
  }
}

export async function updateSessionActivity(): Promise<void> {
  // Throttle: only write once every 5 minutes
  const now = Date.now();
  if (now - lastActivityUpdate < SESSION_ACTIVITY_THROTTLE_MS) return;
  lastActivityUpdate = now;

  try {
    const sessionId = localStorage.getItem('sessionId');
    if (!sessionId) return;

    await supabase
      .from('user_sessions')
      .update({ last_activity: new Date().toISOString() })
      .eq('id', sessionId);
  } catch (error) {
    console.error('Error updating session activity:', error);
  }
}

export async function removeUserSession(): Promise<void> {
  try {
    const sessionId = localStorage.getItem('sessionId');
    if (!sessionId) return;

    await supabase.from('user_sessions').delete().eq('id', sessionId);
    localStorage.removeItem('sessionId');
  } catch (error) {
    console.error('Error removing user session:', error);
  }
}

export async function checkSessionValidity(userId: string): Promise<boolean> {
  try {
    const sessionId = localStorage.getItem('sessionId');
    if (!sessionId) return false;

    const { data: sessions } = await supabase
      .from('user_sessions')
      .select('id')
      .eq('user_id', userId);

    return (sessions || []).some((s) => s.id === sessionId);
  } catch (error) {
    console.error('Error checking session validity:', error);
    return false;
  }
}
