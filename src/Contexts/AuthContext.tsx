import React, { useContext, useEffect, useState } from "react";
import { auth } from "../Firebase";
import { useLocalStorage } from "../Core/Hooks/useLocalStorage";

interface AuthContextInterface {
  currentUser: any;
  login: (email: string, password: string) => void;
  signup: (email: string, password: string) => void;
  resetPassword: (email: string) => void;
  logout: () => void;
}

export const AuthContext = React.createContext({} as AuthContextInterface);

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authKey, setAuthKey] = useLocalStorage<string>("authkey", "");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!authKey);

  const login = (email: string, password: string) => {
    setIsLoggedIn(true);
    setAuthKey("SHOPKARTAPPKEY8034");

    return auth.signInWithEmailAndPassword(email, password);
  };

  const signup = (email: string, password: string) => {
    setIsLoggedIn(true);
    setAuthKey("SHOPKARTAPPKEY8034");

    return auth.createUserWithEmailAndPassword(email, password);
  };

  const resetPassword = (email: string) => {
    return auth.sendPasswordResetEmail(email);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setAuthKey("");

    return auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (authKey) {
      setIsLoggedIn(true);
    }
  }, []);

  const value = {
    currentUser,
    isLoggedIn,
    login,
    signup,
    resetPassword,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;
