"use client"
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface LoginCardContextProps {
  showLoginCard: boolean;
  setShowLoginCard: (show: boolean) => void;
  isLogin: boolean;
  toggleLogin: () => void;
}

const LoginCardContext = createContext<LoginCardContextProps | undefined>(undefined);

export const LoginCardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showLoginCard, setShowLoginCard] = useState(false);
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const toggleLogin = () => {
    setIsLogin(!isLogin);
  };

  return (
    <LoginCardContext.Provider value={{ showLoginCard, setShowLoginCard, isLogin, toggleLogin }}>
      {children}
    </LoginCardContext.Provider>
  );
};

export const useLoginCard = () => {
  const context = useContext(LoginCardContext);
  if (!context) {
    throw new Error('useLoginCard must be used within a LoginCardProvider');
  }
  return context;
};
