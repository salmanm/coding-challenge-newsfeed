import React, { useContext, useMemo, useState } from 'react';
import jwt from 'jsonwebtoken';

const getToken = (userId: number) => jwt.sign({ sub: userId }, 'dummy-keyyyy');

type ContextType = {
  token: string | null;
  login: (_: number) => void;
  isLoggedIn: boolean;
};

const initialContext: ContextType = {
  token: null,
  isLoggedIn: false,
  login() {
    // @todo implement
  },
};

const AuthContext = React.createContext<ContextType>(initialContext);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  const contextValue = useMemo(
    () => ({
      token,
      isLoggedIn: !!token,
      login: (userId: number) => {
        if (!userId) {
          setToken(null);
          localStorage.removeItem('token');
          return;
        }

        // assuming we supply username/pass to an auth service and get a token.
        const token = getToken(userId);
        setToken(token);
        localStorage.setItem('token', token);
      },
    }),
    [token]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
