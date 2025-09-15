'use client';

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  return (
    <button onClick={handleLogout} className="px-4 py-2 bg-gray-200">
      Logout
    </button>
  );
}
