import React from 'react';
import { LoadingProvider, useLoading } from './context/loadingContext';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from './common/GlobalStyle';
import { AuthProvider } from 'context/authContext';
import MainRouter from './components/MainRouter';
import Loading from './components/Common/Loading';
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
