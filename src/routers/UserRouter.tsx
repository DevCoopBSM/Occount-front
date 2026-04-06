import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import UserPage from 'pages/User/UserPage';
import UserMain from 'components/User/UserMain';
import HowTo from 'components/User/HowTo';
import Login from 'components/User/Login';
import PwChange from 'components/User/pwChange';
import PwChangeEX from 'components/User/pwChangeEX';
import Register from 'components/User/Register';
import Update from 'components/User/Update';
import UserLog from 'components/User/UserLog';
import ItemList from 'components/User/ItemList';
import EventNotice from 'components/User/EventNotice';
import NoticePage from 'pages/User/NoticePage';
import PrivateRoute from 'common/PrivateRoute';

const UserRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/pwchange/:jwtToken" element={<PwChangeEX />} />
      <Route path="/pwchange" element={<PwChange />} />

      <Route path="/" element={<UserPage />}>
        <Route index element={<UserMain />} />
        <Route path="howto" element={<HowTo />} />
        <Route path="event" element={<EventNotice />} />
        <Route path="notice" element={<NoticePage />} />
        <Route path="/item-list" element={<ItemList />} />
        <Route path="update" element={<PrivateRoute><Update /></PrivateRoute>} />
        <Route path="userlog" element={<PrivateRoute><UserLog /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;