import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const NotificationModal =({modal,onClose}) => {
  const handleClose = () => onClose();

  return <>
      <Modal
        show={modal.show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className={modal.status?"text-success":"text-danger"}>{modal.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={modal.status?"text-success":"text-danger"}>{modal.message}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
}

export default NotificationModal