import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useAxios } from '../../../contexts/AxiosContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface EditRegisterMovementProps {
  show: boolean;
  handleClose: () => void;
  movementId: string;
}

const EditRegisterMovement: React.FC<EditRegisterMovementProps> = ({ show, handleClose, movementId }) => {
  const [formData, setFormData] = useState({
    equipmentId: '',
    userId: '',
    fromLocation: '',
    toLocation: '',
    movementType: ''
  });
  const [equipments, setEquipments] = useState<{ _id: string, name: string, serialNumber: string }[]>([]);
  const [currentEquipment, setCurrentEquipment] = useState<{ _id: string, name: string, serialNumber: string } | null>(null);
  const axios = useAxios();

  useEffect(() => {
    if (movementId) {
      axios.get(`/movementHistory/${movementId}`)
        .then(response => {
          setFormData(response.data);
          axios.get(`/equipments/${response.data.equipment._id}`)
            .then(response => {
              setCurrentEquipment(response.data);
            })
            .catch(_error => {
              toast.error('Error fetching movement data');
            });
        })
        .catch(_error => {
          toast.error('Error fetching movement data');
        });
    }

    axios.get('/equipments')
        .then(response => {
            setEquipments(response.data);
        })
        .catch(_error => {
            toast.error('Error fetching equipments');
        });
  }, [movementId, axios]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    axios.put(`/movementHistory/${movementId}`, formData)
      .then(() => {
        toast.success('Movement updated successfully');
        handleClose();
      })
      .catch(_error => {
        toast.error('Error updating movement');
      });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Movement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="equipmentId">
              <Form.Label>Equipment ID</Form.Label>
              <Form.Control
                as="select"
                name="equipmentId"
                value={formData.equipmentId}
                onChange={handleChange}
                required
              >
                <option value=''>{currentEquipment ? currentEquipment.name : ''}</option>
                {equipments.map(equipment => (
                  <option key={equipment._id} value={equipment._id}>{equipment.name} - {equipment.serialNumber}</option>
                ))}
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='serialNumber'>
              <Form.Label>Serial Number</Form.Label>
              <Form.Control
                type='text'
                name='serialNumber'
                value={currentEquipment ? currentEquipment.serialNumber : ''}
                readOnly
              />
            </Form.Group>
            <Form.Group controlId="fromLocation">
              <Form.Label>From Location</Form.Label>
              <Form.Control
                type="text"
                name="fromLocation"
                value={formData.fromLocation}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="toLocation">
              <Form.Label>To Location</Form.Label>
              <Form.Control
                type="text"
                name="toLocation"
                value={formData.toLocation}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="movementType">
              <Form.Label>Movement Type</Form.Label>
              <Form.Control
                type="text"
                name="movementType"
                value={formData.movementType}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default EditRegisterMovement;