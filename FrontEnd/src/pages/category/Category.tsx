import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { fetchCategories, deleteCategory } from '../../store/slices/categorySlice';
import { AppState } from '../../store/store';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddNewCategory from './components/AddNewCategory';

interface CategoryProps {
    toast: typeof toast;
}

export interface Categories {
    _id: string;
    name: string;
    description: string;
}

const CategoryPage: React.FC<CategoryProps> = ({ toast }) => {
    const dispatch: AppDispatch = useDispatch();
    const { categories, loading, error } = useSelector((state: AppState) => state.category);
    console.log(categories);
    const [newCategory, setNewCategory] = React.useState<Categories | null>(null);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch, newCategory]);

    const handleDelete = (id: string) => {
        dispatch(deleteCategory(id))
            .then(() => {
                toast.success('Category deleted successfully');
            })
            .catch((error: Error) => {
                toast.error(error.message);
            });
    }

    const handleCategoryCreated = (_newCategory: Categories) => {
        setNewCategory(_newCategory);
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mt-5" style={{ width: '100%' }}>
            <div className="row">
                <div className="col">
                    <h1 className="mb-4">Categories</h1>
                </div>
                <div className="col">
                    <AddNewCategory onCategoryCreated={handleCategoryCreated} />
                </div>
            </div>
            <div className="row">
                {Array.isArray(categories) && categories.map(category => (
                    <div className="col-md-4 mb-4" key={category._id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{category.name}</h5>
                                <p className="card-text">{category.description}</p>
                                <button className="btn btn-danger" onClick={() => handleDelete(category._id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

}

export default CategoryPage;