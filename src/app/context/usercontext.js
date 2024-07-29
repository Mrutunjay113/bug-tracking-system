"use client";
import { verifyJwtToken } from "@/lib/utils";
import { createContext, useContext, useState } from "react";

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState({
    token: null,
  });
  const [user, setUser] = useState({
    user: null,
  });

  const saveToken = (newToken) => {
    setToken(newToken);
    const decodedToken = verifyJwtToken(newToken);
    setUser(decodedToken);
  };

  const removeToken = () => {
    setToken(null);
  };

  return (
    <TokenContext.Provider value={{ token, saveToken, removeToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  return useContext(TokenContext);
};
