'use client';

import { useEffect, useState } from 'react';

export default function JsonEditor({ endpoint }: { endpoint: string }) {
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(endpoint, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => setContent(JSON.stringify(data, null, 2)));
  }, [endpoint]);

  async function handleSave() {
    setMessage('');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: content,
        credentials: 'include',
      });
      if (res.ok) {
        setMessage('Saved');
      } else {
        setMessage('Save failed');
      }
    } catch {
      setMessage('Save failed');
    }
  }

  return (
    <div className="space-y-2">
      <textarea
        className="w-full h-64 border"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        type="button"
        className="px-4 py-2 bg-blue-500 text-white"
        onClick={handleSave}
      >
        Save
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}
