// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase'; // Optional: TypeScript types for your DB schema

// Client-side Supabase client (uses anon key)
export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Server-side Supabase client (uses anon key for API routes, since we need to access the session)
export function createServerClient() {
  return createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, // Use anon key for session access
    {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
      },
    }
  );
}

export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

export async function signInWithGoogle(redirectUrl: string = `${window.location.origin}/api/auth/confirm`) {
  const currentPage = window.location.href;
  const redirectTo = `${redirectUrl}?next=${encodeURIComponent(currentPage)}`;

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
        response_type: 'code',
      },
    },
  });
  if (error) throw error;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}