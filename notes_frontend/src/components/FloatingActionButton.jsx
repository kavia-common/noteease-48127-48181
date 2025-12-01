import React from 'react';

// PUBLIC_INTERFACE
export default function FloatingActionButton({ onClick }) {
  /** Circular floating action button. */
  return (
    <button className="fab" aria-label="Add note" onClick={onClick} title="Add note">
      +
    </button>
  );
}
