import JsonEditor from '@/components/JsonEditor';

export default function PromosAdminPage() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl">Edit Promos</h1>
      <JsonEditor endpoint="/api/promos" />
    </div>
  );
}
