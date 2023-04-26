import { Modal, Button, Form } from "react-bootstrap";

const ServiceInfoAdmin = ({ serviceForm, show, setShow, carData, setCarData }) => {
  
    
  return (
    <Modal show={show} onHide={()=>setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Service Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={() => {}}>
        <Form.Group controlId="currentStatus">
            <Form.Label>Current Status</Form.Label>
            <Form.Control type="text" value={serviceForm.currentStatus} disabled />
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
          <Button variant="secondary" onClick={()=>setShow(false)}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

export default ServiceInfoAdmin;
