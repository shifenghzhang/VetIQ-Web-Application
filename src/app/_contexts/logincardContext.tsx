"use client"
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface LoginCardContextProps {
  showLoginCard: boolean;
  setShowLoginCard: (show: boolean) => void;
}

const LoginCardContext = createContext<LoginCardContextProps | undefined>(undefined);

export const LoginCardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showLoginCard, setShowLoginCard] = useState(false);

  return (
    <LoginCardContext.Provider value={{ showLoginCard, setShowLoginCard }}>
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
