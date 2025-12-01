import React, { useEffect, useRef, useState } from 'react';
import { useNotesDispatch, useNotesState } from '../store/NotesContext';

// PUBLIC_INTERFACE
export default function SearchBar() {
  /** Search input controlling query and tag toggling. */
  const { filter } = useNotesState();
  const dispatch = useNotesDispatch();
  const [query, setQuery] = useState(filter.query || '');
  const debounceRef = useRef();

  useEffect(() => {
    setQuery(filter.query || '');
  }, [filter.query]);

  useEffect(() => {
    const root = document;
    function onClick(e) {
      const tagEl = e.target.closest?.('.tag');
      if (tagEl) {
        const tag = tagEl.getAttribute('data-tag');
        dispatch({
          type: 'SET_FILTER',
          payload: {
            ...filter,
            tags: filter.tags?.includes(tag)
              ? filter.tags.filter(t => t !== tag)
              : [...(filter.tags || []), tag],
          },
        });
      }
    }
    root.addEventListener('click', onClick);
    return () => root.removeEventListener('click', onClick);
  }, [dispatch, filter]);

  function onChange(e) {
    const val = e.target.value;
    setQuery(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      dispatch({ type: 'SET_FILTER', payload: { ...filter, query: val } });
    }, 200);
  }

  return (
    <div className="searchbar" role="search">
      <span aria-hidden="true" style={{ color: '#6b7280' }}>🔎</span>
      <input
        aria-label="Search notes"
        placeholder="Search notes by title, content, or #tag..."
        value={query}
        onChange={onChange}
      />
    </div>
  );
}
