import React, { useMemo, useState } from 'react';
import './theme.css';
import './App.css';
import NavBar from './components/NavBar';
import NotesList from './components/NotesList';
import NoteEditor from './components/NoteEditor';
import FloatingActionButton from './components/FloatingActionButton';
import { ErrorBoundary } from './components/ErrorBoundary';
import { NotesProvider } from './store/NotesContext';
import { getEnv } from './utils/env';

// PUBLIC_INTERFACE
function AppShell() {
  /** Top-level application shell for NoteEase. */
  const [editorOpen, setEditorOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  function openNew() {
    setEditing(null);
    setEditorOpen(true);
  }
  function openEdit(note) {
    setEditing(note);
    setEditorOpen(true);
  }
  function closeEditor() {
    setEditorOpen(false);
    setEditing(null);
  }

  const env = useMemo(() => getEnv(), []);

  return (
    <div>
      <NavBar />
      <main className="container" role="main">
        {env.apiBase && (
          <div className="kicker" style={{ marginBottom: 10 }}>
            Connected base: {env.apiBase} (placeholder, not used yet)
          </div>
        )}
        <NotesList onEditRequest={openEdit} />
      </main>
      <FloatingActionButton onClick={openNew} />
      <NoteEditor open={editorOpen} onClose={closeEditor} initial={editing} />
      <div className="footer">NoteEase • Ocean Professional UI</div>
    </div>
  );
}

// PUBLIC_INTERFACE
export default function App() {
  /** App entry wrapped with providers and error boundary. */
  return (
    <ErrorBoundary>
      <NotesProvider>
        <AppShell />
      </NotesProvider>
    </ErrorBoundary>
  );
}
