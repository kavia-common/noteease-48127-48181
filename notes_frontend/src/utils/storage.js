const KEY = 'notes.v1';

function safeParse(json, fallback) {
  try { return JSON.parse(json); } catch { return fallback; }
}

// PUBLIC_INTERFACE
export function loadNotes() {
  /** Load notes array from localStorage. */
  if (typeof window === 'undefined') return [];
  const raw = window.localStorage.getItem(KEY);
  const data = safeParse(raw, []);
  return Array.isArray(data) ? data : [];
}

// PUBLIC_INTERFACE
export function saveNotes(notes) {
  /** Persist notes array to localStorage. */
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(notes));
  } catch {
    // ignore quota errors
  }
}
