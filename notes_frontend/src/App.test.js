import { render, screen } from '@testing-library/react';
import App from './App';

test('renders brand NoteEase', () => {
  render(<App />);
  const brand = screen.getByText(/NoteEase/i);
  expect(brand).toBeInTheDocument();
});

test('renders add button', () => {
  render(<App />);
  const btn = screen.getByLabelText(/Add note/i);
  expect(btn).toBeInTheDocument();
});
