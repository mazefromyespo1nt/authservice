import React, { FC } from 'react';
import "../Modal/modalCSS/modal.css"

interface ConfirmDeleteModalProps {
  show: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

const ModalConfirmar: FC<ConfirmDeleteModalProps> = ({ show, handleClose, handleConfirm }) => {
  if (!show) {
    return null;
  }

  return (
    <div className='modal-background'>
    <div className="modal show" style={{ display: 'block' }} tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirmar Eliminación</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <p>¿Estás seguro de que deseas eliminar los usuarios seleccionados?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>No</button>
            <button type="button" className="btn btn-danger" onClick={handleConfirm}>Sí</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ModalConfirmar;
