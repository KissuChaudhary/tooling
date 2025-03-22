// app/login/page.tsx
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import LoginPopup from '@/components/LoginPopup';

export default async function LoginPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect('/');
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Sign In</h1>
        <LoginPopup open={true} onOpenChange={() => redirect('/')} />
      </div>
    </div>
  );
}