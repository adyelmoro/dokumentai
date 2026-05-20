'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function SignOutButton({ label = 'Logg ut' }: { label?: string }) {
  const router = useRouter();

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  }

  return (
    <button
      onClick={signOut}
      className="text-sm text-gray-400 hover:text-gray-700 transition-colors"
    >
      {label}
    </button>
  );
}
