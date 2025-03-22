// app/auth/callback/route.ts
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) {
      const errorUrl = new URL('/error', origin);
      errorUrl.searchParams.set('message', 'Missing authorization code');
      return NextResponse.redirect(errorUrl.toString());
    }

    // Step 1: Exchange the code for a session
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      console.error('Error exchanging code for session:', error);
      const errorUrl = new URL('/error', origin);
      errorUrl.searchParams.set('message', 'Authentication failed');
      return NextResponse.redirect(errorUrl.toString());
    }

    // Step 2: Verify the session by fetching the user
    const { data: userData, error: userError } = await supabase.auth.getUser(data.session.access_token);
    if (userError || !userData.user) {
      console.error('Error verifying user:', userError);
      const errorUrl = new URL('/error', origin);
      errorUrl.searchParams.set('message', 'Failed to verify user');
      return NextResponse.redirect(errorUrl.toString());
    }

    // Step 3: Set the session in cookies (only store essential data)
    await supabase.auth.setSession({
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
    });

    // Step 4: Redirect to the desired page
    const redirectUrl = new URL('/tools/ai-username-generator', origin);
    return NextResponse.redirect(redirectUrl.toString());
  } catch (error) {
    console.error('Error in auth callback:', error);
    const { origin } = new URL(request.url);
    const errorUrl = new URL('/error', origin);
    errorUrl.searchParams.set('message', 'Server error during authentication');
    return NextResponse.redirect(errorUrl.toString());
  }
}