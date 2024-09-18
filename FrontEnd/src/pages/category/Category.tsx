import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAxios } from '../../contexts/AxiosContext';
import AddNewCategory from './components/AddNewCategory';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface Categories {
    _id: string;
    name: string;
    description: string;
}

const CategoryPage: React.FC = () => {
    const axios = useAxios();
    const [categories, setCategories] = useState<Categories[]>([]);

    useEffect(() => {
        axios.get("http://localhost:4000/api/categories")
            .then(response => setCategories(response.data))
            .catch(error => console.log("Error fetching categories: " + error.message));
    }, []);

    const deleteCategory = (id: string) => {
        axios.delete(`http://localhost:4000/api/categories/${id}`)
            .then(() => {
                setCategories(categories.filter(category => category._id !== id))
                toast.success('Category deleted successfully');
            })
            .catch(error => {
                console.log('Error deleting category: ', error.response.data.message || error.message);
                toast.error('Error deleting category: ' + error.response.data.message || error.message);
            });
    }

    const handleCategoryCreated = (newCategory: Categories) => {
        setCategories([...categories, newCategory]);
    }

    return (
        <div className="container mt-5">
            <ToastContainer />
            <div className="row">
                <div className="col">
                    <h1 className="mb-4">Categories</h1>
                </div>
                <div className="col">
                    <AddNewCategory onCategoryCreated={handleCategoryCreated} />
                </div>
            </div>
            <div className="row">
                {categories.map((category: Categories) => (
                    <div className="col-md-4 mb-4" key={category._id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{category.name}</h5>
                                <p className="card-text">{category.description}</p>
                                <button className="btn btn-danger" onClick={() => deleteCategory(category._id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

}

export default CategoryPage;