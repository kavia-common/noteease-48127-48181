import { render } from '@testing-library/react';
import NotesList from './NotesList';
import { NotesProvider } from '../store/NotesContext';

test('renders empty state when no notes', () => {
  const { getByText } = render(
    <NotesProvider>
      <NotesList onEditRequest={() => {}} />
    </NotesProvider>
  );
  expect(getByText(/No notes yet/i)).toBeInTheDocument();
});
