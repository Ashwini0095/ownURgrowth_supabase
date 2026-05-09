import { createClient } from "@supabase/supabase-js";

type SupabaseAnyClient = ReturnType<typeof createClient<any>>;

function requireEnvValue(name: string, value: string | undefined) {
  if (!value) {
    throw new Error(`Missing ${name} environment variable`);
  }

  return value;
}

const supabaseUrl = requireEnvValue(
  "NEXT_PUBLIC_SUPABASE_URL",
  process.env.NEXT_PUBLIC_SUPABASE_URL,
);
const supabaseAnonKey = requireEnvValue(
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

// Client-side Supabase client (uses anon key, respects RLS)
export const supabase = createClient<any>(supabaseUrl, supabaseAnonKey);

// Server-side Supabase client (uses service role key, bypasses RLS)
// Only use in API routes, never expose to the browser
let _supabaseAdmin: SupabaseAnyClient | null = null;

export function getSupabaseAdmin(): SupabaseAnyClient {
  if (!_supabaseAdmin) {
    const serviceRoleKey = requireEnvValue(
      "SUPABASE_SERVICE_ROLE_KEY",
      process.env.SUPABASE_SERVICE_ROLE_KEY,
    );
    _supabaseAdmin = createClient<any>(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
  }

  return _supabaseAdmin;
}
