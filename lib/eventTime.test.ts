import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseTimeLabel, localToUtcISO, toICSDate } from './eventTime';

test('parses a typical range', () => {
  assert.deepStrictEqual(parseTimeLabel('10:00 AM – 12:00 PM'), { sh: 10, sm: 0, eh: 12, em: 0 });
});

test('parses a single time', () => {
  assert.deepStrictEqual(parseTimeLabel('2 PM'), { sh: 14, sm: 0 });
});

test('handles malformed input', () => {
  assert.deepStrictEqual(parseTimeLabel('not a time'), {});
});

test('converts local time to UTC ISO', () => {
  const iso = localToUtcISO('2024-05-01', 10, 30);
  const d = new Date('2024-05-01T00:00:00');
  d.setHours(10, 30, 0, 0);
  const expected = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().replace('.000Z', 'Z');
  assert.strictEqual(iso, expected);
});

test('formats ISO strings for ICS', () => {
  assert.strictEqual(toICSDate('2024-01-02T03:04:05Z'), '20240102T030405Z');
});
