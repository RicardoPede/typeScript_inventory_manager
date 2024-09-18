import { useState, ChangeEvent, FormEvent } from "react";
import { Equipment } from "../Inventory";

interface EditEquipmentFormProps {
    equipment: Equipment;
    onSave: (equipment: Equipment) => void;
    onCancel: () => void;
}

export default function EditEquipmentForm({ equipment, onSave, onCancel }: EditEquipmentFormProps) {
    const [formData, setFormData] = useState<Equipment>(equipment);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="container mt-5">
            <h2>Edit Equipment</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" className="form-control mb-2" placeholder="Name" name="name" value={formData.name} onChange={handleChange} />
                    <input type="text" className="form-control mb-2" placeholder="Description" name="description" value={formData.description} onChange={handleChange} />
                    <input type="text" className="form-control mb-2" placeholder="Serial Number" name="serialNumber" value={formData.serialNumber} onChange={handleChange} />
                    <input type="text" className="form-control mb-2" placeholder="Category" name="category" value={formData.category} onChange={handleChange} />
                    <input type="text" className="form-control mb-2" placeholder="Status" name="status" value={formData.status} onChange={handleChange} />
                    <input type="text" className="form-control mb-2" placeholder="Location" name="location" value={formData.location} onChange={handleChange} />
                    <input type="date" className="form-control mb-2" placeholder="Purchase Date" name="purchaseDate" value={formData.purchaseDate} onChange={handleChange} />
                    <input type="text" className="form-control mb-2" placeholder="Image URL" name="image" value={formData.image} onChange={handleChange} />
                    <input type="number" className="form-control mb-2" placeholder="Price" name="price" value={formData.price} onChange={handleChange} />
                    <input type="number" className="form-control mb-2" placeholder="Stock" name="stock" value={formData.stock} onChange={handleChange} />
                    <button className="btn btn-primary" type="submit">Save</button>
                    <button className="btn btn-secondary ml-2" type="button" onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
}