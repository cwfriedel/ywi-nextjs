export function parseTimeLabel(label?: string): { sh?: number; sm?: number; eh?: number; em?: number } {
  if (!label) return {};
  const [a, b] = label.split(/–|-/).map(s => s.trim());
  const toHM = (s?: string) => {
    if (!s) return {};
    const m = s.match(/(\d{1,2})(?::(\d{2}))?\s*(AM|PM)/i);
    if (!m) return {};
    let h = parseInt(m[1], 10);
    const min = m[2] ? parseInt(m[2], 10) : 0;
    const ap = m[3].toUpperCase();
    if (ap === "PM" && h !== 12) h += 12;
    if (ap === "AM" && h === 12) h = 0;
    return { h, min };
  };
  const s = toHM(a);
  const e = toHM(b);
  const result: { sh?: number; sm?: number; eh?: number; em?: number } = {};
  if (typeof (s as any).h === "number") {
    result.sh = (s as any).h;
    result.sm = (s as any).min;
  }
  if (typeof (e as any).h === "number") {
    result.eh = (e as any).h;
    result.em = (e as any).min;
  }
  return result;
}

export function localToUtcISO(dateStr: string, h = 9, m = 0) {
  const d = new Date(dateStr + "T00:00:00");
  d.setHours(h, m, 0, 0);
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().replace(".000Z", "Z");
}

export function toICSDate(iso: string) {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;
}
