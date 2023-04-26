import React, { useState } from "react";
// import { Button, Modal } from "react-bootstrap";
import { Modal, Button, Form } from "react-bootstrap";
import { carServiceStages } from "../../Utils/utils";
import { updateService } from "../../Controllers/service";
const ServiceInfoAdmin = ({
  serviceForm,
  show,
  setShow,
  carData,
  setCarData,
  fetchData,
  startDate,
  endDate
}) => {
  const [currentStatus, setCurrentStatus] = useState(serviceForm.currentStatus);
  
  const handleClose = async (e) => {
    let finalData = { ...serviceForm, currentStatus };
    let up = await updateService(finalData.id, currentStatus);
    
    let x = carData.map((car) => (car.id === finalData.id ? finalData : car));
    await fetchData(startDate,endDate);
    // setCarData(x)
    setShow(false);
  };
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Service Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={() => {}}>
          <Form.Group controlId="currentStatus">
            <Form.Label>Current Service Status</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => {
                setCurrentStatus(e.target.value);
              }}
              defaultValue={serviceForm.currentStatus}
            >
              {carServiceStages.map((stage) => (
                <option key={stage} value={stage}>{stage}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="name">
            <Form.Label>Customer Name</Form.Label>
            <Form.Control type="text" value={serviceForm.name} disabled />
          </Form.Group>

          <Form.Group controlId="make">
            <Form.Label>Make</Form.Label>
            <Form.Control type="text" value={serviceForm.make} disabled />
          </Form.Group>

          <Form.Group controlId="model">
            <Form.Label>Model</Form.Label>
            <Form.Control type="text" value={serviceForm.model} disabled />
          </Form.Group>

          <Form.Group controlId="make">
            <Form.Label>Year Of Purchase</Form.Label>
            <Form.Control type="text" value={serviceForm.year} disabled />
          </Form.Group>

          <Form.Group controlId="make">
            <Form.Label>Last Service Date</Form.Label>
            <Form.Control
              type="text"
              value={serviceForm.lastServiceDate}
              disabled
            />
          </Form.Group>

          <Form.Group controlId="make">
            <Form.Label>Mileage</Form.Label>
            <Form.Control type="text" value={serviceForm.mileage} disabled />
          </Form.Group>

          <Form.Group controlId="serviceType">
            <Form.Label>Service Type</Form.Label>
            <Form.Control
              type="text"
              value={serviceForm.serviceType}
              disabled
            />
          </Form.Group>

          <Form.Group controlId="cost">
            <Form.Label>Make</Form.Label>
            <Form.Control type="text" value={serviceForm.cost} disabled />
          </Form.Group>
        </Form>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

export default ServiceInfoAdmin;
