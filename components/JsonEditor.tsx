'use client';

import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';

export type JsonEditorProps = {
  endpoint: string;
  initialContent?: string;
  title?: string;
  description?: string;
  submitLabel?: string;
  className?: string;
};

type FeedbackState =
  | { status: 'idle' }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string };

const defaultFeedback: FeedbackState = { status: 'idle' };

function parseResponseMessage(raw: string | null): string | undefined {
  if (!raw) return undefined;
  try {
    const data = JSON.parse(raw) as { message?: unknown; error?: unknown };
    if (typeof data.error === 'string') return data.error;
    if (data.error && typeof data.error === 'object' && 'message' in data.error) {
      const nested = (data.error as { message?: unknown }).message;
      if (typeof nested === 'string') return nested;
    }
    if (typeof data.message === 'string') return data.message;
    return undefined;
  } catch {
    return raw;
  }
}

export default function JsonEditor({
  endpoint,
  initialContent = '',
  title,
  description,
  submitLabel = 'Save changes',
  className,
}: JsonEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [feedback, setFeedback] = useState<FeedbackState>(defaultFeedback);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(endpoint, { credentials: 'include' });
        const raw = await res.text();
        if (!res.ok) {
          const msg = parseResponseMessage(raw);
          setFeedback({ status: 'error', message: msg ?? 'Failed to load data.' });
          return;
        }
        try {
          const data = JSON.parse(raw);
          setContent(JSON.stringify(data, null, 2));
        } catch {
          setContent(raw);
        }
      } catch {
        setFeedback({ status: 'error', message: 'Failed to load data.' });
      }
    }
    load();
  }, [endpoint]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback(defaultFeedback);

    try {
      JSON.parse(content);
    } catch {
      setFeedback({ status: 'error', message: 'Invalid JSON.' });
      return;
    }

    setIsSaving(true);

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: content,
        credentials: 'include',
      });

      const rawBody = await res.text();
      const bodyMessage = parseResponseMessage(rawBody);

      if (!res.ok) {
        setFeedback({
          status: 'error',
          message: bodyMessage ?? 'Failed to save data.',
        });
        return;
      }

      setFeedback({
        status: 'success',
        message: bodyMessage ?? 'Saved.',
      });
    } catch (error) {
      setFeedback({
        status: 'error',
        message: error instanceof Error ? error.message : 'Failed to save data.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
    setFeedback(defaultFeedback);
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      {title ? <h2 className="text-xl font-semibold text-forest">{title}</h2> : null}
      {description ? <p className="mt-1 text-sm text-stone">{description}</p> : null}

      <textarea
        value={content}
        onChange={handleChange}
        spellCheck={false}
        className="mt-4 w-full rounded-lg border border-stone/30 bg-white font-mono text-sm leading-relaxed text-stone-900 shadow-sm focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
        rows={18}
      />

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button type="submit" className="btn-primary disabled:opacity-60" disabled={isSaving}>
          {isSaving ? 'Saving…' : submitLabel}
        </button>

        {feedback.status === 'success' ? (
          <span className="text-sm text-forest">{feedback.message}</span>
        ) : null}

        {feedback.status === 'error' ? (
          <span className="text-sm text-red-600">{feedback.message}</span>
        ) : null}
      </div>
    </form>
  );
}
