import JsonEditor from '@/components/JsonEditor';

export default function GalleriesAdminPage() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl">Edit Galleries</h1>
      <JsonEditor endpoint="/api/galleries" />
    </div>
  );
}
