import React, { FC, useContext, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import "../vitasdash/VitasDashcss/dash1.css";
import ModalEditarUsuario from "../../Components/vitasdash/Modal/ModalEditarUsuario";
import { UsuariosContext } from "../../context/dashtabla/UsersTableContext";
import { UserDeleteContext } from "../../context/dashtabla/userDeleteContext";
import ModalConfirmar from "./Modal/ModalConfirmar";

const columns: TableColumn<any>[] = [
  {
    name: "Nombre",
    selector: (row: any) => row.nombre,
    sortable: true,
  },
  {
    name: "Apellido",
    selector: (row: any) => row.apellido,
    sortable: true,
  },
  {
    name: "Email-@",
    selector: (row: any) => row.email,
    sortable: true,
  },
  {
    name: "Fecha de nacimiento",
    selector: (row: any) => row.fechaNacimiento,
  },
  {
    name: "Telefono",
    selector: (row: any) => row.telefono,
  },
  {
    name: "Acciones",
    selector: (row: any) => row.acciones,
  },
];

const Dash1: FC = () => {
  const { usuarios, modalAbierto, usuarioSeleccionado, cerrarModal } = useContext(UsuariosContext)!;
  const { eliminarUsuarios } = useContext(UserDeleteContext)!;
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleRowSelected = (state: any) => {
    setSelectedRows(state.selectedRows);
  };

  const EliminarusuarioCofirmacion = () =>{
    setIsConfirmModalOpen(true);
  }

  const handleEliminarClick = async () => {
    try {
      const idsUsuarios = selectedRows.map(row => row.idUsuario);
      
      await eliminarUsuarios(idsUsuarios);
      setIsConfirmModalOpen(false);
  
    } catch (error) {
      console.error('Error al eliminar usuarios:', error);
    }
  };
  const cancelarEliminacio  = () =>{
    setIsConfirmModalOpen(false);
  }

  if (!usuarios) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="table-wrapper">
      <DataTable
        title="Usuarios registrados"
        columns={columns}
        data={usuarios}
        pagination
        paginationPerPage={5}
        contextMessage={{ singular: 'Usuario seleccionado', plural: 'Usuarios seleccionados' }}
        selectableRows
        onSelectedRowsChange={handleRowSelected}
        fixedHeader
        contextActions={
          <button onClick={EliminarusuarioCofirmacion} style={{ backgroundColor: "red", borderRadius: "10px", color: "white", borderColor: "white", height: "45px", width: "80px" }}>
            <img src="/iconos/Delete.png" style={{ height: "45px" }} alt="Eliminar" />
          </button>
        }
      />
      {modalAbierto && usuarioSeleccionado && (
        <ModalEditarUsuario
          usuario={usuarioSeleccionado}
          cerrarModal={cerrarModal}
        />
      )}
      <ModalConfirmar
        show={isConfirmModalOpen}
        handleClose={cancelarEliminacio}
        handleConfirm={handleEliminarClick}
      />
    </div>
  );
};

export default Dash1;
