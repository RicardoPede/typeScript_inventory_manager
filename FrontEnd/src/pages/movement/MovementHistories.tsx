import React, { useEffect, useState } from 'react';
import { useAxios } from '../../contexts/AxiosContext';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import { Equipment } from '../inventory/Inventory';
import { useNavigate } from 'react-router-dom';
import EditRegisterMovement from './components/EditRegisterMovement';

interface Movement {
    _id: string;
    equipment: Equipment;
    user: string;
    fromLocation: string;
    toLocation: string;
    movementType: string;
    movementDate: string;
    createdAt: string;
    updatedAt: string;
}

const MovementHistoryPage: React.FC = () => {
    const axios = useAxios();
    const [movements, setMovements] = useState<Movement[]>([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedMovementId, setSelectedMovementId] = useState<string | null >(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:4000/api/movementHistory')
            .then(response => setMovements(response.data))
            .catch(error => console.error('Error fetching movement history:', error));
    }, []);

    const handleEditClick = (movementId: string) => {
        setSelectedMovementId(movementId);
        setShowEditModal(true);
    }

    const handleCloseModal = () => {
        setSelectedMovementId(null);
        setShowEditModal(false);
    }

    return (
        <Container className="mt-4">
                <Row className="mb-3">
                    <Col>
                        <h1 className="text-center">Historial de Movimientos</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table striped bordered hover responsive>
                        <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Equipo</th>
                                    <th>Desde</th>
                                    <th>Hacia</th>
                                    <th>Tipo</th>
                                    <th>Fecha</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {movements.map((movement: any, index: number) => (
                                    <tr key={movement._id}>
                                        <td>{index + 1}</td>
                                        <td>{movement.equipment.name}</td>
                                        <td>{movement.fromLocation}</td>
                                        <td>{movement.toLocation}</td>
                                        <td>{movement.movementType}</td>
                                        <td>{new Date(movement.movementDate).toLocaleDateString()}</td>
                                        <td>
                                            <Button variant="warning" size="sm" className="me-2" onClick={() => handleEditClick(movement._id)}>Editar</Button>
                                            <Button variant="danger" size="sm">Eliminar</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                    <Button className='mt-5' variant="primary" size="sm" onClick={() => navigate('/reports/registermovement')}>Registrar Movimiento</Button>
                </Row>
                {selectedMovementId && <EditRegisterMovement show={showEditModal} handleClose={handleCloseModal} movementId={selectedMovementId} />}
            </Container>
    );
};

export default MovementHistoryPage;