# Notes Frontend (NoteEase)

A modern, lightweight React frontend for a personal Notes app following the Ocean Professional style. This implements local note management (create, edit, delete) with search and tag filtering. Data persists to localStorage. Future backend integration is supported via optional environment variables.

## Features

- Ocean Professional theme with blue and amber accents
- Top navigation bar with brand, search, and quick tag filters
- Notes grid with elegant cards, subtle shadows, rounded corners, gradients, and smooth transitions
- Create, edit, and delete notes (localStorage persistence)
- Search by title/content and #tags; filter by clicking tag chips
- Floating Action Button (+) to add notes
- Note editor as a modal with Save/Cancel
- Helpful empty state and loading placeholders
- Error boundary for robustness
- Minimal tests (render brand and FAB presence)

## Environment Variables

Optional variables (read-only for future backend integration):

- `REACT_APP_API_BASE` – API base URL for future backend
- `REACT_APP_BACKEND_URL` – Alternative API base URL
- `REACT_APP_FRONTEND_URL` – Optional frontend public URL
- `REACT_APP_WS_URL` – Optional websocket URL

If not provided, the app operates fully offline using localStorage.

You can create a `.env.local` with:
```
REACT_APP_API_BASE=
REACT_APP_BACKEND_URL=
REACT_APP_FRONTEND_URL=
REACT_APP_WS_URL=
```

## Getting Started

In the project directory:

### Install
```
npm install
```

### Development
```
npm start
```
Open http://localhost:3000 to view in the browser.

### Tests
```
npm test
```

### Production Build
```
npm run build
```

## Project Structure

- `src/components/` – UI components (NavBar, NotesList, NoteEditor, FloatingActionButton, ErrorBoundary)
- `src/store/NotesContext.js` – Minimal Redux-like store with Context and localStorage sync
- `src/utils/` – Helpers for env and storage
- `src/theme.css` – Ocean Professional theme tokens and component styles
- `src/App.js` – App composition and routing (single page for now)

## Accessibility

- Buttons with aria-labels and roles where appropriate
- Keyboard focus styles via default browser and focus states
- Live regions for loading and empty states

## Future Backend Integration

The app reads environment variables but does not call a backend yet. When integrating APIs:
- Use `getEnv()` from `src/utils/env.js` to obtain base URLs safely.
- Keep localStorage sync as an offline fallback if possible.

## License

MIT
