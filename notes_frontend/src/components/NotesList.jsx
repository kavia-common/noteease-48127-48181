import React from 'react';
import { useFilteredNotes, useNotesDispatch, useNotesState } from '../store/NotesContext';

// PUBLIC_INTERFACE
export default function NotesList({ onEditRequest }) {
  /** Renders note cards; emits edit requests. */
  const notes = useFilteredNotes();
  const { loading } = useNotesState();
  const dispatch = useNotesDispatch();

  if (loading) {
    return (
      <div className="empty">
        <div className="spinner" style={{ margin: '0 auto 12px' }} />
        Loading notes...
      </div>
    );
  }

  if (!notes.length) {
    return (
      <div className="empty" role="status" aria-live="polite">
        <div className="kicker">Start writing</div>
        <h3 style={{ margin: '6px 0 8px' }}>No notes yet</h3>
        <p style={{ margin: 0, color: '#6b7280' }}>
          Click the + button to create your first note. You can add tags using #tag in the title.
        </p>
      </div>
    );
  }

  return (
    <div className="grid" aria-live="polite">
      {notes.map(note => (
        <article key={note.id} className="card" aria-label={`Note ${note.title || 'Untitled'}`}>
          <header>
            <h4 className="card-title">{note.title || 'Untitled'}</h4>
            <div className="card-meta">
              <span>{new Date(note.updatedAt || note.createdAt).toLocaleString()}</span>
              {(note.tags || []).slice(0, 4).map(t => (
                <span key={t} className="tag">#{t}</span>
              ))}
            </div>
          </header>
          <div className="card-body">{note.content}</div>
          <div className="card-actions">
            <button className="btn" onClick={() => onEditRequest(note)}>Edit</button>
            <button
              className="btn btn-danger"
              onClick={() => dispatch({ type: 'DELETE_NOTE', payload: note.id })}
            >
              Delete
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
