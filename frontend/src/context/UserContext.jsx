import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const storedLoggedInUser = localStorage.getItem("loggedInUser");

    if (storedLoggedInUser) {
      setLoggedInUser(JSON.parse(storedLoggedInUser));
    }
  }, []);

  const createUser = async (formData) => {
    try {
      const response = await axios.post(`/api/users/register`, formData, {
        withCredentials: true,
      });
      //console.log('res', response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loginUser = async (formData) => {
    try {
      const response = await axios.post(`/api/users/login`, formData, {
        withCredentials: true,
      });
     // console.log(response.data);
      const userData = response.data;
      localStorage.setItem("loggedInUser", JSON.stringify(userData));
      setIsLoggedIn(true)
      setLoggedInUser(userData);
    } catch (error) {
      console.log(error);
    }
  };

  const logoutUser = async () => {
    try {
      const response = await axios.post("/api/users/logout", {
        withCredentials: true,
      });
      setIsLoggedIn(false);
      localStorage.removeItem("loggedInUser");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        createUser,
        loginUser,
        isLoggedIn,
        setIsLoggedIn,
        logoutUser,
        loggedInUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
