"use client";
import { createContext, useContext, useState } from "react";

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState({
    token: null,
  });

  const [user, setUser] = useState(null);
  const saveToken = async (newToken) => {
    setToken(newToken);
    const decodedToken = await verifyJwtToken(newToken);
    setUser({
      id: decodedToken.id,
      email: decodedToken.email,
      firstName: decodedToken.firstName,
      lastName: decodedToken.lastName,
      role: decodedToken.role,
      image: decodedToken.image,
    });
  };

  const removeToken = () => {
    setToken(null);
  };

  return (
    <TokenContext.Provider
      value={{ token, saveToken, removeToken, user, setUser }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  return useContext(TokenContext);
};

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
// export const useUser = () => {
//   return useContext(UserContext);
// };
