import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import MainPage from 'pages/User/MainPage';
import HowToPage from 'pages/user/HowToPage';
import NotFoundPage from 'pages/NotFoundPage';
import PrepairPage from 'pages/Admin/Preparing';
import LoginPage from 'pages/User/LoginPage';
import UserlogPage from 'pages/User/UserlogPage';
import AdminLoginPage from 'pages/Admin/LoginPage';
import AdminMainPage from 'pages/Admin/MainPage';
import {PaymentSuccessPage} from 'pages/Toss/Success';
import {FailPage} from 'pages/Toss/Fail';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/howto" element={<HowToPage />} />
      <Route path="/toss/success" element={<PaymentSuccessPage />} />
      <Route path="/toss/fail" element={<FailPage />} />
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
