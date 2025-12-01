import React from 'react';

// PUBLIC_INTERFACE
export class ErrorBoundary extends React.Component {
  /** Catches render errors and shows a friendly UI. */
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('UI ErrorBoundary caught:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="container">
          <div className="empty">
            <div className="kicker">Something went wrong</div>
            <h3 style={{ margin: '6px 0 8px' }}>We hit a snag</h3>
            <p style={{ margin: 0, color: '#6b7280' }}>
              Please refresh the page. If the problem persists, contact support.
            </p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
