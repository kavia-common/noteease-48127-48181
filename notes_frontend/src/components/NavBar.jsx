import React from 'react';
import SearchBar from './SearchBar';
import { useNotesState } from '../store/NotesContext';

function uniqueTags(notes) {
  const set = new Set();
  notes.forEach(n => (n.tags || []).forEach(t => set.add(t)));
  return Array.from(set).slice(0, 8);
}

// PUBLIC_INTERFACE
export default function NavBar() {
  /** Top navigation bar with brand and search + quick tags. */
  const { notes, filter } = useNotesState();
  const tags = uniqueTags(notes);

  return (
    <nav className="navbar" aria-label="Top navigation">
      <div className="navbar-inner">
        <div className="brand" aria-label="App brand">
          <div className="brand-badge" aria-hidden="true">
            <div className="badge-dot" />
          </div>
          NoteEase
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 12 }}>
          <SearchBar />
          {tags.length > 0 && (
            <div className="tags" aria-label="Suggested tags">
              {tags.map(tag => (
                <span
                  key={tag}
                  className={`tag ${filter.tags?.includes(tag) ? 'active' : ''}`}
                  data-tag={tag}
                  role="button"
                  tabIndex={0}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
