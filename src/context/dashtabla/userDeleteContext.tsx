import React, { createContext, useContext } from 'react';

export interface UserDeleteContextType {
  eliminarUsuarios: (idsUsuarios: number[]) => Promise<void>;
}

export const UserDeleteContext = createContext<UserDeleteContextType | undefined>(undefined);

export const useUserDelete = () => {
  const context = useContext(UserDeleteContext);
  if (!context) {
    throw new Error('useUserDelete debe ser usado dentro de un UserDeleteContextProvider');
  }
  return context;
};

export const UserDeleteProvider: React.FC = ({ children }) => {
  const eliminarUsuarios = async (idsUsuarios: number[]) => {
    try {
      const requestBody = {
        idsUsuarios: idsUsuarios
      };

      const response = await fetch('http://localhost:8088/api/usuarios/status/false', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(idsUsuarios),
      });
      

      if (!response.ok) {
        throw new Error('Error al cambiar el estado de los usuarios');
      }

  

    } catch (error) {
      console.error('Error al cambiar el estado de los usuarios:', error);
      throw error;
    }
  };

  return (
    <UserDeleteContext.Provider value={{ eliminarUsuarios }}>
      {children}
    </UserDeleteContext.Provider>
  );
};
