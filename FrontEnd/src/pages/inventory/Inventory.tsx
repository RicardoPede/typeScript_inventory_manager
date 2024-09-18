import { useEffect, useState } from "react";
import AddNewEquipment from "./components/AddNewEquipment";
import EditEquipmentForm from "./components/EditEquipmentForm";
import { useAxios } from "../../contexts/AxiosContext";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";

export interface Equipment {
    _id: string;
    name: string;
    description: string;
    serialNumber: string;
    category: string;
    status: string;
    location: string;
    purchaseDate: string;
    image: string;
    price: number;
    stock: number;
}

export interface Category {
    _id: string;
    name: string;
}

export default function Inventory() {
    const axios = useAxios();
    const [equipments, setEquipments] = useState<Equipment[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(null);

    useEffect(() => {
        axios.get("http://localhost:4000/api/equipments")
            .then(response => setEquipments(response.data))
            .catch(error => console.log("Error fetching equipments: " + error.message));

        axios.get("http://localhost:4000/api/categories")
            .then(response => setCategories(response.data))
            .catch(error => console.error('Error fetching categories: ', error));
    }, []);

    const deleteEquipment = (id: string) => {
        axios.delete(`http://localhost:4000/api/equipments/${id}`)
            .then(() => {
                setEquipments(equipments.filter(equipment => equipment._id !== id))
                toast.success('Equipment deleted successfully');
            })
            .catch(error => {
                console.log('Error deleting equipment: ', error.response.data.message || error.message);
                toast.error('Error deleting equipment: ' + error.response.data.message || error.message);
            });
    }

    const startEditing = (equipments: Equipment) => {
        setEditingEquipment(equipments);
        toast.info('Editing equipment: ' + equipments.name);
    }

    const updateEquipment = (updatedEquipment: Equipment) => {
        axios.put(`http://localhost:4000/api/equipments/${updatedEquipment._id}`, updatedEquipment)
            .then(() => {
                setEquipments(equipments.map(equipment =>
                    equipment._id === updatedEquipment._id ? updatedEquipment : equipment
                ));
                setEditingEquipment(null);
                toast.success('Equipment updated successfully');
            })
            .catch(error => {
                console.log('Error updating equipment: ', error)
                toast.error('Error updating equipment: ' + error.response.data.message || error.message);
            });
    };

    const handleEquipmentCreated = (newEquipment: Equipment) => {
        setEquipments([...equipments, newEquipment]);
    }

    const getCategoryName = (id: string) => {
        const category = categories.find(category => category._id === id);
        return category?.name || 'Unknown';
    }

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Equipments</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Número de Serie</th>
                        <th>Categoría</th>
                        <th>Estado</th>
                        <th>Ubicación</th>
                        <th>Fecha de Compra</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {equipments.map((equipment: Equipment) => (
                        <tr key={equipment._id}>
                            <td>{equipment.name}</td>
                            <td>{equipment.serialNumber}</td>
                            <td>{getCategoryName(equipment.category)}</td>
                            <td>{equipment.status}</td>
                            <td>{equipment.location}</td>
                            <td>{new Date(equipment.purchaseDate).toLocaleDateString()}</td>
                            <td>{equipment.price}</td>
                            <td>{equipment.stock}</td>
                            <td>
                                <button className="btn btn-primary btn-sm" onClick={() => startEditing(equipment)}>Editar</button>
                                <button className="btn btn-danger btn-sm" onClick={() => deleteEquipment(equipment._id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal show={!!editingEquipment} onHide={() => setEditingEquipment(null)}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {editingEquipment && (
                        <EditEquipmentForm equipment={editingEquipment} onSave={updateEquipment} onCancel={() => setEditingEquipment(null)} />
                    )}
                </Modal.Body>
            </Modal>
            <AddNewEquipment onEquipmentCreated={handleEquipmentCreated} />
        </div>
    );
}


