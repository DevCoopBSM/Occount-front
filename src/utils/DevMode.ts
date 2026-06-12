export const isDevMode = (): boolean =>
  process.env.NODE_ENV === 'development' &&
  process.env.REACT_APP_DEV_MODE === 'true' &&
  localStorage.getItem('DEV_MODE') !== 'false';
