import React from 'react';
import { LoadingProvider, useLoading } from './contexts/loadingContext';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from './common/GlobalStyle';
import { AuthProvider } from 'contexts/authContext';
import MainRouter from './components/MainRouter';
import Loading from './common/Loading';
import { setLoadingFunction } from './utils/Axios';

const AppContent = () => {
  const { setIsLoading } = useLoading();

  React.useEffect(() => {
    setLoadingFunction(setIsLoading);
  }, [setIsLoading]);

  return (
    <AuthProvider>
      <BrowserRouter>
        <GlobalStyle />
        <Loading />
        <MainRouter />
      </BrowserRouter>
    </AuthProvider>
  );
};

function App() {
  return (
    <LoadingProvider>
      <AppContent />
    </LoadingProvider>
  );
}

export default App;
