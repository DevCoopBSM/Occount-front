import React, { createContext, useState, useContext, useEffect } from 'react';
import { setLoadingFunction, setErrorFunction } from 'utils/Axios';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const clearError = () => setError(null);

  useEffect(() => {
    setLoadingFunction(setIsLoading);
    setErrorFunction(setError);
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, error, clearError }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);