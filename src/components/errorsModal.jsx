import React, { useState, useEffect } from "react";
import { Modal, Button, ListGroup } from "react-bootstrap";
const ErrorModal = ({ errors }) => {
  const [show, setShow] = useState(errors.length>0);
  useEffect(()=>{
    setShow(errors.length>0)
  },[errors])
  const onClose = () => {
    setShow(false);
    window.location.reload();
  };
  const title = "Please fix the following errors to proceed";
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errors && errors.length > 0 ? (
          <ListGroup>
            {errors.map((error, index) => (
              <ListGroup.Item key={index} variant="danger">
                {error}
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p>No errors to display.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ErrorModal;
