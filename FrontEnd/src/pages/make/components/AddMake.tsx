import { useAxios } from '../../../contexts/AxiosContext';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

declare global {
    interface Window {
        bootstrap: any;
    }
}

export interface Make {
    _id: string;
    name: string;
}

interface AddNewMakeProps {
    onMakeCreated: (newMake: Make) => void;
}

export default function AddNewMake({ onMakeCreated }: AddNewMakeProps) {
    const axios = useAxios();
    const [formData, setFormData] = useState<Partial<Make>>({});
    const collapseRef = useRef<HTMLDivElement>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('/make', formData);
            onMakeCreated(response.data);
            setFormData({});
            toast.success('Make added successfully');
            if (collapseRef.current) {
            const collapseElement = new window.bootstrap.Collapse(collapseRef.current, {
                    toggle: true
                });
                collapseElement.toggle();
            }
        } catch (error) {
            toast.error('Error adding make');
        }
    };

    return (
        <div className="accordion accordion-flush m-4" id="accordionFlushExample">
            <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingOne">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="true" aria-controls="flush-collapseOne">
                        <h2>Add New Make</h2>
                    </button>
                </h2>
                <div ref={collapseRef} id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Make</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name='name'
                                        value={formData.name || ''}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">Add Make</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
