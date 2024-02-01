import React from 'react';
import { Modal, ModalBody } from 'reactstrap';

interface props {
  show: boolean;
  child: any;
  onCloseClick: () => void;
  validateDeleteChild: (id) => void;
}

const DeleteModal = ({
  child,
  show,
  onCloseClick,
  validateDeleteChild,
}: props) => {
  return (
    <Modal isOpen={show} toggle={onCloseClick} centered={true}>
      <div className="modal-content">
        <ModalBody className="px-4 py-5 text-center">
          <button
            type="button"
            onClick={onCloseClick}
            className="btn-close position-absolute end-0 top-0 m-3"
          ></button>
          <div className="avatar-sm mb-4 mx-auto">
            <div className="avatar-title bg-primary text-primary bg-opacity-10 font-size-20 rounded-3">
              <i className="mdi mdi-trash-can-outline"></i>
            </div>
          </div>
          <p className="text-muted font-size-16 mb-4">
            Vous êtes sur le point de supprimer la fiche
          </p>

          <div className="hstack gap-2 justify-content-center mb-0">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => validateDeleteChild(child)}
            >
              Confirmer la suppression
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCloseClick}
            >
              Annuler
            </button>
          </div>
        </ModalBody>
      </div>
    </Modal>
  );
};

export default DeleteModal;
