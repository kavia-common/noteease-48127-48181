import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { loadNotes, saveNotes } from '../utils/storage';

const NotesStateContext = createContext(undefined);
const NotesDispatchContext = createContext(undefined);

const initialState = {
  notes: [],
  loading: false,
  error: null,
  filter: { query: '', tags: [] },
};

function id() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function reducer(state, action) {
  switch (action.type) {
    case 'INIT':
      return { ...state, notes: action.payload || [] };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'ADD_NOTE': {
      const note = { ...action.payload, id: id(), createdAt: Date.now(), updatedAt: Date.now() };
      const notes = [note, ...state.notes];
      return { ...state, notes };
    }
    case 'UPDATE_NOTE': {
      const notes = state.notes.map(n =>
        n.id === action.payload.id ? { ...n, ...action.payload, updatedAt: Date.now() } : n
      );
      return { ...state, notes };
    }
    case 'DELETE_NOTE': {
      const notes = state.notes.filter(n => n.id !== action.payload);
      return { ...state, notes };
    }
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    default:
      return state;
  }
}

// PUBLIC_INTERFACE
export function NotesProvider({ children }) {
  /** Provides notes state and dispatch with localStorage persistence. */
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const data = loadNotes();
    dispatch({ type: 'INIT', payload: data });
  }, []);

  useEffect(() => {
    saveNotes(state.notes);
  }, [state.notes]);

  const value = useMemo(() => state, [state]);
  return (
    <NotesStateContext.Provider value={value}>
      <NotesDispatchContext.Provider value={dispatch}>
        {children}
      </NotesDispatchContext.Provider>
    </NotesStateContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useNotesState() {
  /** Hook to access notes state */
  const ctx = useContext(NotesStateContext);
  if (!ctx) throw new Error('useNotesState must be used within NotesProvider');
  return ctx;
}

// PUBLIC_INTERFACE
export function useNotesDispatch() {
  /** Hook to access notes dispatcher */
  const ctx = useContext(NotesDispatchContext);
  if (!ctx) throw new Error('useNotesDispatch must be used within NotesProvider');
  return ctx;
}

// PUBLIC_INTERFACE
export function useFilteredNotes() {
  /** Returns notes matching current search query and tag filters. */
  const { notes, filter } = useNotesState();
  const q = (filter.query || '').toLowerCase();
  const tags = filter.tags || [];
  return notes.filter(n => {
    const matchesQuery =
      !q ||
      (n.title || '').toLowerCase().includes(q) ||
      (n.content || '').toLowerCase().includes(q) ||
      (n.tags || []).some(t => t.toLowerCase().includes(q));
    const matchesTags = tags.length === 0 || (n.tags || []).some(t => tags.includes(t));
    return matchesQuery && matchesTags;
  });
}
