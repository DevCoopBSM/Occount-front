import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import UserPage from 'pages/User/UserPage';
import AuthLayout from 'pages/User/AuthLayout';
import UserMain from 'components/User/UserMain';
import HowTo from 'components/User/HowTo';
import Login from 'components/User/Login';
import PwChange from 'components/User/pwChange';
import PwChangeEX from 'components/User/pwChangeEX';
import Register from 'components/User/Register';
import Update from 'components/User/Update';
import UserLog from 'components/User/UserLog';
import ItemList from 'components/User/ItemList';
import NoticePage from 'pages/User/NoticePage';
import ContactPage from 'pages/User/ContactPage';
import PrivateRoute from 'common/PrivateRoute';

const UserRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<UserPage />}>
        <Route index element={<UserMain />} />
        <Route path="pwchange/:jwtToken" element={<PwChangeEX />} />
        <Route path="pwchange" element={<PwChange />} />
        <Route path="howto" element={<HowTo />} />
        <Route path="notice" element={<NoticePage />} />
        <Route path="item-list" element={<ItemList />} />
        <Route
          path="contact"
          element={
            <PrivateRoute>
              <ContactPage />
            </PrivateRoute>
          }
        />
        <Route
          path="update"
          element={
            <PrivateRoute>
              <Update />
            </PrivateRoute>
          }
        />
        <Route
          path="userlog"
          element={
            <PrivateRoute>
              <UserLog />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/404" />} />
      </Route>

      {/* 인증 페이지: Header/Footer 없는 별도 레이아웃 */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
