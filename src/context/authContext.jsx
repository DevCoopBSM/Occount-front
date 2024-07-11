import React, { createContext, useContext, useState, useEffect } from 'react';
import { axiosInstance } from '../utils/Axios'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

function useProvideAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return document.cookie.includes('isLoggedIn');
  });
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return document.cookie.includes('isAdminLoggedIn');
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(null);

  const fetchUserInformation = async () => {
    try {
      const response = await axiosInstance.get("/userinfo");
      const userInfo = {
        point: response.data.point,
        name: response.data.student_name,
        code: response.data.code_number,
        email: response.data.email,
        todayTotalCharge: response.data.todayTotalCharge
      };
      setUser(userInfo);
      return userInfo;
    } catch (error) {
      console.error("Error fetching user information:", error);
      return null;
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserInformation();
    } else {
      setUser(null);
    }
  }, [isLoggedIn]);

  const unifiedLogin = async (email, password, navigate, admin = false) => {
    try {
      const url = admin ? "/admin/login" : "/login";
      const response = await axiosInstance.post(url, {
        email: email,
        password: password,
      });
      const { name, point, message } = response.data;
      if (admin) {
        localStorage.setItem("adminname", name);
        setIsAdminLoggedIn(true);
      } else {
        localStorage.setItem("clientname", name);
      }
      setIsLoggedIn(true);
      await fetchUserInformation();
      navigate(admin ? "/admin" : "/");
      setErrorMessage("");
      return { email, name, point, message };
    } catch (error) {
      let errMsg = "내부 서버 오류";
      if (error.response) {
        if (error.response.status === 401) {
          errMsg = "아이디 또는 암호가 잘못되었습니다.";
        } else if (error.response.status === 403) {
          errMsg = "관리자가 아닙니다.";
        }
      }  
      setErrorMessage(errMsg);
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
    }
  };

  const logout = async (admin = false, navigate) => {
    try {
      await axiosInstance.post("/logout");
      setIsLoggedIn(false);
      setIsAdminLoggedIn(false);
      setUser(null);
      navigate(admin ? "/admin" : "/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return {
    isLoggedIn,
    isAdminLoggedIn,
    unifiedLogin,
    logout,
    setIsLoggedIn,
    setIsAdminLoggedIn,
    errorMessage,
    setErrorMessage,
    user,  // user 정보를 포함시킵니다.
    setUser,
    refetchUser: fetchUserInformation  // refetch 기능 추가
  };
}

export const useAuth = () => {
  return useContext(AuthContext);
};
