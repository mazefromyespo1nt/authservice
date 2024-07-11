import React, { createContext, useContext, useState, ReactNode } from "react";

type ListUserContextType = {
  showSignUp: boolean;
  showDash1: boolean;
  openSignUp: () => void;
  openDash1: () => void;
  Allfalse: () => void;
};

const ListUserContext = createContext<ListUserContextType | undefined>(undefined);

export const UseListUserContext = () => {
  const context = useContext(ListUserContext);
  if (!context) {
    throw new Error("UseListUserContext must be used within a ListUserProvider");
  }
  return context;
};

export const ListUserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showDash1, setShowDash1] = useState(false);

  const openSignUp = () => {
    setShowSignUp(true);
    setShowDash1(false); // Oculta Dash1 si está visible
  };

  const openDash1 = () => {
    setShowDash1(true);
    setShowSignUp(false); // Oculta SignUp si está visible
  };
  const Allfalse = () => {
    setShowSignUp(false);
    setShowDash1(false);
  };

  return (
    <ListUserContext.Provider value={{ showSignUp, showDash1, openSignUp, openDash1, Allfalse }}>
      {children}
    </ListUserContext.Provider>
  );
};
