import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import MainPage from 'pages/User/MainPage';
import HowToPage from 'pages/User/HowToPage';
import NotFoundPage from 'pages/NotFoundPage';
import PrepairPage from 'pages/Admin/Preparing';
import LoginPage from 'pages/User/LoginPage';
import UserlogPage from 'pages/User/UserlogPage';
import AdminLoginPage from 'pages/Admin/LoginPage';
import AdminMainPage from 'pages/Admin/MainPage';
import { PaymentRedirectPage } from 'pages/Pg/PaymentRedirect';
import { PaymentResultPage } from 'pages/Pg/PaymentResult';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/howto" element={<HowToPage />} />
      <Route path="/payment-redirect" element={<PaymentRedirectPage />} />
      <Route path="/payment-result" element={<PaymentResultPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/userlog" element={<UserlogPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin/*" element={<AdminMainPage />} />
      <Route path="/preparing" element={<PrepairPage />} />
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
