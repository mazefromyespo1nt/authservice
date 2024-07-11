import React, { createContext, useContext, useState, ReactNode } from 'react';


interface MenuContextType {
  menuOpen: boolean;
  toggleMenu: () => void;
}


const MenuContext = createContext<MenuContextType | undefined>(undefined);


export const MenuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setMenuOpen(prevState => !prevState);
  };

  return (
    <MenuContext.Provider value={{ menuOpen, toggleMenu }}>
      {children}
    </MenuContext.Provider>
  );
};


export const useMenuContext = (): MenuContextType => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenuContext debe ser usado dentro de un MenuProvider');
  }
  return context;
};
