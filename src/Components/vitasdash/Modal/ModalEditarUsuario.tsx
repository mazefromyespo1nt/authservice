// ModalEditarUsuario.tsx
import React, { FC, useState, useEffect } from "react";
import { Usuario } from "../../../context/dashtabla/UsersTableContext";
import { useUsersUpdate } from "../../../context/dashtabla/UserUpdateContext";
import "../Modal/modalCSS/modal.css"

interface ModalEditarUsuarioProps {
  usuario: Usuario | null;
  cerrarModal: () => void;
}

const ModalEditarUsuario: FC<ModalEditarUsuarioProps> = ({ usuario, cerrarModal }) => {
  const { actualizarUsuario } = useUsersUpdate();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");

  useEffect(() => {
    if (usuario) {
      setNombre(usuario.nombre);
      setApellido(usuario.apellido);
      setEmail(usuario.email);
      setTelefono(usuario.telefono);
    }
  }, [usuario]);

  const handleGuardarCambios = async () => {
    if (usuario) {
      const usuarioActualizado: Usuario = {
        ...usuario,
        nombre,
        apellido,
        email,
        telefono,
      };
      await actualizarUsuario(usuarioActualizado);
      cerrarModal();
    }
  };

  if (!usuario) return null;

  return (
  <div className="modal-background">
    <div className="modal fade show d-block" tabIndex={-1} role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar Usuario</h5>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="apellido">Apellido</label>
                <input
                  type="text"
                  className="form-control"
                  id="apellido"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="telefono">Teléfono</label>
                <input
                  type="tel"
                  className="form-control"
                  id="telefono"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={cerrarModal}>Cerrar</button>
            <button type="button" className="btn btn-primary" onClick={handleGuardarCambios}>Guardar Cambios</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ModalEditarUsuario;
