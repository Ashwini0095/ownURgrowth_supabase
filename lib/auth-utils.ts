import { supabase } from './supabaseClient';

export const signInWithGoogle = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: typeof window !== 'undefined' ? window.location.origin : undefined,
      },
    });
    if (error) return { user: null, error: error.message };
    return { user: null, error: null, redirecting: true };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
};

export const signUpWithEmail = async (email: string, password: string, name?: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name || '',
        },
        emailRedirectTo: typeof window !== 'undefined' ? `${window.location.origin}/` : undefined,
      },
    });
    if (error) return { user: null, session: null, error: error.message };
    
    // Supabase returns an empty identities array if the user already exists and email confirmations are ON
    if (data.user?.identities && data.user.identities.length === 0) {
      return { user: null, session: null, error: "An account with this email already exists. Please log in." };
    }
    
    return { user: data.user, session: data.session, error: null };
  } catch (error: any) {
    return { user: null, session: null, error: error.message };
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return { user: null, error: error.message };
    return { user: data.user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
};

export const resendVerificationEmail = async (email: string) => {
  try {
    const { data, error } = await supabase.auth.resend({
      type: 'signup',
      email,
      options: {
        emailRedirectTo: typeof window !== 'undefined' ? `${window.location.origin}/` : undefined,
      },
    });
    if (error) return { error: error.message };
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};
