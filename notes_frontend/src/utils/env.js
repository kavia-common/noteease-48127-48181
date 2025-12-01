export const getEnv = () => {
  // PUBLIC_INTERFACE
  /**
   * Provides environment configuration from CRA-style env vars.
   * Returns undefined for unset values so callers can branch safely.
   */
  const apiBase = process.env.REACT_APP_API_BASE || process.env.REACT_APP_BACKEND_URL || undefined;
  const wsUrl = process.env.REACT_APP_WS_URL || undefined;
  const frontendUrl = process.env.REACT_APP_FRONTEND_URL || undefined;
  return { apiBase, wsUrl, frontendUrl };
};
