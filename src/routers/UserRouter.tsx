import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserPage from 'pages/User/UserPage';
import UserMain from 'components/User/UserMain';
import HowTo from 'components/User/HowTo';
import Login from 'components/User/Login';
import PwChange from 'components/User/pwChange';
import PwChangeEX from 'components/User/pwChangeEX';
import Register from 'components/User/Register';
import UserLog from 'components/User/UserLog';

const UserRoutes: React.FC = () => {
  return (
    <UserPage>
      <Routes>
        <Route path="/" element={<UserMain />} />
        <Route path="/howto" element={<HowTo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pwchange/:jwtToken" element={<PwChangeEX />} />
        <Route path="/pwchange" element={<PwChange />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userlog" element={<UserLog />} />
      </Routes>
    </UserPage>
  );
};

export default UserRoutes;