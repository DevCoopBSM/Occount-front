import { useState, useEffect } from "react";
import { axiosInstance } from "../utils/Axios";
import { useAuth } from "../context/authContext";

export const getUserInformation = async () => {
  try {
    const response = await axiosInstance.get("/userinfo");
    console.log(response.data.student_name);
    return {
      point: response.data.point,
      name: response.data.student_name,
      code: response.data.code_number,
      email: response.data.email,
      todayTotalCharge: response.data.todayTotalCharge
    };
  } catch (error) {
    throw error;
  }
};

export const useUser = () => {
  const [user, setUser] = useState(null);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    fetchUser();
  }, [isLoggedIn]);

  const fetchUser = async () => {
    if (!isLoggedIn) {
      setUser(null);
      return;
    }
    try {
      const response = await getUserInformation();
      setUser(response);
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };

  const refetch = () => {
    fetchUser();
  };

  return {
    user,
    refetch,
  };
};
