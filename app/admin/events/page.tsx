import JsonEditor from '@/components/JsonEditor';

export default function EventsAdminPage() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl">Edit Events</h1>
      <JsonEditor endpoint="/api/events" />
    </div>
  );
}
