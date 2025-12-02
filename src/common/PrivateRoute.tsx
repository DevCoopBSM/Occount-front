import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from 'contexts/authContext';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isLoggedIn, user } = useAuth();
  const location = useLocation();

  const isAuthenticated = isLoggedIn && user;

  if (!isAuthenticated) {
    return (
      <Navigate 
        to="/login" 
        state={{ from: location.pathname, message: '로그인이 필요한 페이지입니다.' }} 
        replace 
      />
    );
  }

  return <>{children}</>;
};

export default PrivateRoute;
