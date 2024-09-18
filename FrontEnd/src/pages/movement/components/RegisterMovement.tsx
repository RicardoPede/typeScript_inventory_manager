import React, { useEffect, useState } from 'react';
import { useAxios } from '../../../contexts/AxiosContext';
import { useNavigate } from 'react-router-dom';
import { Equipment } from '../../inventory/Inventory';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/store';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface RegisterMovement {
    equipmentId: string;
    userId: string;
    fromLocation: string;
    toLocation: string;
    movementType: string;
}

const RegisterMovement: React.FC = () => {
    const axios = useAxios();
    const [formData, setFormData] = useState<RegisterMovement>({
        equipmentId: '',
        userId: '',
        fromLocation: '',
        toLocation: '',
        movementType: ''
    });
    const [equipment, setEquipment] = useState<Equipment[]>([]);
    const [serialNumber, setSerialNumber] = useState('');
    const navigate = useNavigate();
    const { user } = useSelector((state: AppState) => state.auth);

    useEffect(() => {
        axios.get('http://localhost:4000/api/equipments')
            .then(response => setEquipment(response.data))
            .catch(error => console.error('Error fetching equipments:', error));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        if (e.target.name === 'equipmentId') {
            const selectedEquipment = equipment.find(equipment => equipment._id === e.target.value);
            if (selectedEquipment) {
                setSerialNumber(selectedEquipment.serialNumber);
                setFormData({
                    ...formData,
                    fromLocation: selectedEquipment.location,
                    [e.target.name]: e.target.value
                });
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user) {
            console.error('No user found');
            return;
        }
        try {
            await axios.post('/movementHistory/register', {
                ...formData,
                userId: user._id
            });
            toast.success('Movimiento registrado con éxito');
            navigate('/reports');
        } catch (error) {
            toast.error('Error al registrar movimiento');
            console.error('Error registering movement:', error);
        }
    };

    return (
        <div className="container mt-4">
            <ToastContainer />
            <h1 className="text-center">Registrar Movimiento</h1>
            <div className='d-flex justify-content-end'>
                <button className="btn btn-secondary mt-3" onClick={() => navigate('/reports')}>Volver Atrás</button>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="equipmentId">ID del Equipo</label>
                    <select className="form-control" id="equipmentId" name="equipmentId" value={formData.equipmentId} onChange={handleChange} required >
                        <option value="">Seleccione un equipo</option>
                        {equipment.map((equipment: Equipment) => (
                            <option key={equipment._id} value={equipment._id}>
                                {equipment.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="equipmentId">ID Serial</label>
                    <input type='text' className="form-control" id="serialNumber" name="serialNumber" value={serialNumber} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="fromLocation">Desde</label>
                    <input type="text" className="form-control" id="fromLocation" name="fromLocation" value={formData.fromLocation} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="toLocation">Hacia</label>
                    <input type="text" className="form-control" id="toLocation" name="toLocation" value={formData.toLocation} onChange={handleChange} required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="movementType">Tipo de Movimiento</label>
                    <input type="text" className="form-control" id="movementType" name="movementType" value={formData.movementType} onChange={handleChange} required
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Registrar</button>
            </form>
        </div>
    );
};

export default RegisterMovement;