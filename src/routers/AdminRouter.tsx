import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminLoginPage from 'pages/Admin/LoginPage';
import AdminMainPage from 'pages/Admin/MainPage';

const AdminRoutes: React.FC = () => {
  return (
      <Routes>
        <Route path="login" element={<AdminLoginPage />} />
        <Route path="*" element={<AdminMainPage />} />
      </Routes>
  );
};

export default AdminRoutes;