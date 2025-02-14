import React, { createContext, useState, useContext, useEffect, useCallback, useRef } from 'react';
import { setLoadingFunction, setErrorFunction } from 'utils/Axios';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [state, setState] = useState({
    isLoading: false,
    error: null,
    shouldShowLoading: false,
  });
  const timerRef = useRef(null);

  const clearAll = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setState({
      isLoading: false,
      error: null,
      shouldShowLoading: false,
    });
  }, []);

  const setLoading = useCallback((loading) => {
    setState(prev => ({
      ...prev,
      isLoading: loading,
      shouldShowLoading: loading || !!prev.error,
      error: loading ? null : prev.error,
    }));
  }, []);

  const setError = useCallback((err) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setState(prev => ({
      ...prev,
      isLoading: false,
      error: err,
      shouldShowLoading: !!err,
    }));

    if (err) {
      timerRef.current = setTimeout(() => {
        setState(prev => ({
          ...prev,
          error: null,
          shouldShowLoading: false,
        }));
      }, 1000 );
    }
  }, []);

  useEffect(() => {
    setLoadingFunction(setLoading);
    setErrorFunction(setError);

    return clearAll;
  }, [setLoading, setError, clearAll]);

  return (
    <LoadingContext.Provider value={{ ...state, clearAll }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};