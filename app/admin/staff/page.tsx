import JsonEditor from '@/components/JsonEditor';

export default function StaffAdminPage() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl">Edit Staff</h1>
      <JsonEditor endpoint="/api/staff" />
    </div>
  );
}
