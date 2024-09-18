import { useAxios } from '../../../contexts/AxiosContext';
import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

declare global {
    interface Window {
        bootstrap: any;
    }
}

export interface Category {
    _id: string;
    name: string;
    description: string;
}

interface AddNewCategoryProps {
    onCategoryCreated: (newCategory: Category) => void;
}

export default function AddNewCategory({ onCategoryCreated }: AddNewCategoryProps) {
    const axios = useAxios();
    const [formData, setFormData] = useState<Partial<Category>>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/categories', formData);
            onCategoryCreated(response.data);
            toast.success('Category created successfully');
            setFormData({});
            const collapseElement = document.getElementById('flush-collapseOne');
            if (collapseElement) {
                const collapse = new window.bootstrap.Collapse(collapseElement, {
                    toggle: true
                });
                collapse.hide();
            }
        } catch (error: any) {
            console.error('Error creating category', error.response?.data.errors);
            toast.error(`Error: ${error.response?.data.message || error.message}`);
        }
    }

    return (
        <div className="accordion accordion-flush m-4" id="accordionFlushExample">
            <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingOne">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="true" aria-controls="flush-collapseOne">
                        <h2>Add New Category</h2>
                    </button>
                </h2>
                <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        value={formData.name || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="description"
                                        name="description"
                                        value={formData.description || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">Add Category</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}