import { useAxios } from '../../../contexts/AxiosContext';
import { ChangeEvent, FormEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { Equipment } from "../Inventory";

interface Category {
    _id: string;
    name: string;
}

interface AddNewEquipmentProps {
    onEquipmentCreated: (newEquipment: Equipment) => void;
}

const AddNewEquipment: React.FC<AddNewEquipmentProps> = ({ onEquipmentCreated }) => {    const axios = useAxios();
    const [categories, setCategories] = useState<Category[]>([]);
    const [formData, setFormData] = useState<Partial<Equipment>>({});

    useEffect(() => {
        axios.get('/categories')
            .then(response => {
                console.log('Fetched categories:', response.data); // Verifica que los datos incluyen _id
                setCategories(response.data);
            })
            .catch(error => console.error('Error fetching categories: ', error));
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('/equipments', formData);
            onEquipmentCreated(response.data);
            setFormData({});
            toast.success('Equipo creado exitosamente');
            const collapseElement = document.getElementById('flush-collapseOne');
            if (collapseElement) {
                const collapse = new window.bootstrap.Collapse(collapseElement, {
                    toggle: true
                });
                collapse.hide();
            }
        } catch (error: any) {
                console.error('Error al crear el equipo', error.response?.data);
                toast.error(`Error: ${error.response?.data.message || error.message}`);
        }
    }

    return (
        <div className="accordion accordion-flush mt-4" id="accordionFlushExample">
            <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingOne">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="true" aria-controls="flush-collapseOne">
                        <h2>Add New Equipment</h2>
                    </button>
                </h2>
                <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body">
                        <form onSubmit={handleSubmit}>
                            <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                <div className="form-group">
                                    <input type="text" className="form-control mb-2" name="name" placeholder="Name" onChange={handleChange} />
                                    <input type="text" className="form-control mb-2" name="description" placeholder="Description" onChange={handleChange} />
                                    <input type="text" className="form-control mb-2" name="serialNumber" placeholder="Serial" onChange={handleChange} />
                                    <select className="form-control mb-2" name="category" id="category" value={formData.category || ''} onChange={handleChange}>
                                        <option value="">Select a category</option>
                                        {categories.map(category => (
                                            <option key={category._id} value={category._id}>{category.name}</option>
                                        ))}
                                    </select>
                                    <input type="text" className="form-control mb-2" name="status" placeholder="Status" onChange={handleChange} />
                                    <input type="text" className="form-control mb-2" name="location" placeholder="Location" onChange={handleChange} />
                                    <input type="text" className="form-control mb-2" name="image" placeholder="Image" onChange={handleChange} />
                                    <input type="number" className="form-control mb-2" name="price" placeholder="Price" onChange={handleChange} />
                                    <input type="number" className="form-control mb-2" name="stock" placeholder="Stock" onChange={handleChange} />
                                    <input type="date" className="form-control mb-2" name="purchaseDate" onChange={handleChange} />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-sm mt-3" >Add Equipment</button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>

    )
}

export default AddNewEquipment;