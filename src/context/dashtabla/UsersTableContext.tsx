import React, { createContext, useState, useEffect, ReactNode } from "react";

export interface Usuario {
  idUsuario: number;
  nombre: string;
  apellido: string;
  email: string;
  fecha_nacimiento: Date;
  telefono: string;
  acciones: JSX.Element;
}

interface UsuariosContextProps {
  usuarios: Usuario[];
  abrirModal: (usuario: Usuario) => void;
  cerrarModal: () => void;
  usuarioSeleccionado: Usuario | null;
  modalAbierto: boolean;
  iniciarActualizacionAutomatica: () => void;
  detenerActualizacionAutomatica: () => void;
}

export const UsuariosContext = createContext<UsuariosContextProps | undefined>(undefined);

export const UsuariosProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario | null>(null);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const obtenerUsuarios = async () => {
    try {
      const response = await fetch("http://localhost:8088/usuarios");
      const data = await response.json();
      const formattedData = data.map((usuario: any) => ({
        ...usuario,
        acciones: (
          <button
            style={{ borderStyle: 'none' }}
            type='button'
            className='btn btn-warning'
            onClick={() => {
              setUsuarioSeleccionado(usuario);
              setModalAbierto(true);
            }}
          >
            ✏️
          </button>
        )
      }));
      setUsuarios(formattedData);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  };

  const iniciarActualizacionAutomatica = () => {
    if (!intervalId) {
      const id = setInterval(obtenerUsuarios, 5000); 
      setIntervalId(id);
    }
  };

  const detenerActualizacionAutomatica = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  useEffect(() => {
    obtenerUsuarios();
    iniciarActualizacionAutomatica();

    return () => detenerActualizacionAutomatica();
  }, []);

  const abrirModal = (usuario: Usuario) => {
    setUsuarioSeleccionado(usuario);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setUsuarioSeleccionado(null);
    setModalAbierto(false);
  };

  return (
    <UsuariosContext.Provider value={{ usuarios, abrirModal, cerrarModal, usuarioSeleccionado, modalAbierto, iniciarActualizacionAutomatica, detenerActualizacionAutomatica }}>
      {children}
    </UsuariosContext.Provider>
  );
};
