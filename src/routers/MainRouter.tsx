import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserRouter from './UserRouter';
import AdminRouter from './AdminRouter';
import NotFoundPage from 'pages/NotFoundPage';
import PrepairPage from 'pages/Admin/Preparing';
import { PaymentRedirectPage } from 'pages/Pg/PaymentRedirect';
import { PaymentResultPage } from 'pages/Pg/PaymentResult';

const Router: React.FC = () => {
  return (
    <Routes>
      {/* User Routes */}
      <Route path="/*" element={<UserRouter />} />

      {/* Admin Routes */}
      <Route path="/admin/*" element={<AdminRouter />} />

      {/* Payment Routes */}
      <Route path="/payment-redirect" element={<PaymentRedirectPage />} />
      <Route path="/payment-result" element={<PaymentResultPage />} />

      {/* Other Routes */}
      <Route path="/preparing" element={<PrepairPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;