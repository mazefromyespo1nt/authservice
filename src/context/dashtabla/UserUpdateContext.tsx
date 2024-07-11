import React, { createContext, useContext, useState, ReactNode } from "react";
import { Usuario } from "./UsersTableContext"; 

interface UsersUpdateContextProps {
  usuarios: Usuario[];
  actualizarUsuario: (usuarioActualizado: Usuario) => Promise<void>;
}

const UsersUpdateContext = createContext<UsersUpdateContextProps | undefined>(undefined);

export const useUsersUpdate = () => {
  const context = useContext(UsersUpdateContext);
  if (!context) {
    throw new Error("useUsersTable debe ser usado dentro de UsersTableProvider");
  }
  return context;
};

export const UsersUpdateProvider = ({ children }: { children: ReactNode }) => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  const actualizarUsuario = async (usuarioActualizado: Usuario) => {
    try {
      const response = await fetch(`http://localhost:8088/usuarios/actualizar/${usuarioActualizado.idUsuario}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuarioActualizado),
      });              
      
      if (!response.ok) {
        throw new Error("Error al actualizar el usuario");
      }

      const updatedUsuario = await response.json();

      setUsuarios((prevUsuarios) =>
        prevUsuarios.map((usuario) =>
          usuario.nombre === updatedUsuario.nombre ? updatedUsuario : usuario
        )
      );
    } catch (error) {
      console.error("Error al actualizar el usuario", error);
    }
  };

  return (
    <UsersUpdateContext.Provider value={{ usuarios, actualizarUsuario }}>
      {children}
    </UsersUpdateContext.Provider>
  );
};
