import React, { useEffect, useState } from 'react';
import { useNotesDispatch } from '../store/NotesContext';

function parseTags(text) {
  const re = /#([\p{L}\p{N}\-_]+)/gu;
  const tags = new Set();
  let m;
  while ((m = re.exec(text))) tags.add(m[1]);
  return Array.from(tags);
}

// PUBLIC_INTERFACE
export default function NoteEditor({ open, onClose, initial }) {
  /** Modal for creating/updating a note. */
  const dispatch = useNotesDispatch();
  const [title, setTitle] = useState(initial?.title || '');
  const [content, setContent] = useState(initial?.content || '');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setTitle(initial?.title || '');
      setContent(initial?.content || '');
    }
  }, [open, initial]);

  function onSubmit(e) {
    e.preventDefault();
    const tags = Array.from(new Set([...(initial?.tags || []), ...parseTags(title), ...parseTags(content)]))
      .slice(0, 8);
    const payload = { ...(initial || {}), title: title.trim(), content: content.trim(), tags };
    setSaving(true);
    setTimeout(() => {
      if (initial?.id) {
        dispatch({ type: 'UPDATE_NOTE', payload });
      } else {
        dispatch({ type: 'ADD_NOTE', payload });
      }
      setSaving(false);
      onClose?.();
    }, 300); // slight delay to show spinner
  }

  if (!open) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Note editor">
      <div className="modal">
        <div className="modal-header">
          <strong>{initial?.id ? 'Edit note' : 'New note'}</strong>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn" onClick={onClose} disabled={saving}>Cancel</button>
            <button className="btn btn-primary" onClick={onSubmit} disabled={saving}>
              {saving ? <span className="spinner" /> : 'Save'}
            </button>
          </div>
        </div>
        <form className="modal-body" onSubmit={onSubmit}>
          <input
            className="input"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            autoFocus
          />
          <textarea
            className="textarea"
            placeholder="Write your note..."
            value={content}
            onChange={e => setContent(e.target.value)}
          />
          <div style={{ color: '#6b7280', fontSize: 12 }}>
            Tip: Use #tags in your title or content to categorize notes.
          </div>
        </form>
      </div>
    </div>
  );
}
