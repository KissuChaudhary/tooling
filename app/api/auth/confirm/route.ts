// app/api/auth/confirm/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { cookies } from 'next/headers';

function isMagicLinkType(type: string | null): type is 'magiclink' {
  return type === 'magiclink';
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const token_hash = searchParams.get('token_hash');
    const type = searchParams.get('type');
    const next = searchParams.get('next') || '/';
    const code = searchParams.get('code');
  
    console.log('--- /api/auth/confirm ---', { token_hash, type, next, code });
  
    const cookieStore = cookies();
    const supabase = createServerClient();
  
    // Handle Google OAuth
    if (code) {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      if (error || !data.session) {
        console.error('OAuth error:', error?.message);
        return NextResponse.redirect(new URL(next, request.url));
      }
  
      const cleanNext = decodeURIComponent(next); // Simplify, assuming no nesting now
      const response = NextResponse.redirect(new URL(cleanNext, request.url));
      response.headers.set('X-Robots-Tag', 'noindex');
  
      response.cookies.set('sb-access-token', data.session.access_token, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'lax',
      });
      response.cookies.set('sb-refresh-token', data.session.refresh_token!, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'lax',
      });
  
      console.log('OAuth success:', data.session.user.email, 'Redirecting to:', cleanNext);
      return response;
    }
  
    // Handle magic link (unchanged for brevity)
    if (token_hash && isMagicLinkType(type)) {
      // ... (keep your existing magic link logic)
    }
  
    // Fallback (simplified)
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      console.error('No session found');
      return NextResponse.redirect(new URL(next, request.url));
    }
  
    console.log('Session found:', session.user.email);
    const response = NextResponse.redirect(new URL(next, request.url));
    response.headers.set('X-Robots-Tag', 'noindex');
    return response;
  }