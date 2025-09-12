import Link from 'next/link';
import LogoutButton from '@/components/LogoutButton';

export default function AdminPage() {
  return (
    <div className="space-y-4 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl">Admin</h1>
        <LogoutButton />
      </div>
      <ul className="list-disc pl-5 space-y-2">
        <li><Link href="/admin/events">Events</Link></li>
        <li><Link href="/admin/staff">Staff</Link></li>
        <li><Link href="/admin/promos">Promos</Link></li>
        <li><Link href="/admin/galleries">Galleries</Link></li>
      </ul>
    </div>
  );
}
