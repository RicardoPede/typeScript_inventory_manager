import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMakes, deleteMake } from '../../store/slices/makeSlice';
import { AppState } from '../../store/store';
import { AppDispatch } from '../../store/store';
import AddNewMake from './components/AddMake';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Make {
    _id: string;
    name: string;
}

interface MakeProps {
    toast: typeof toast;
}

const MakeList: React.FC<MakeProps> = ({ toast }) => {
    const dispatch: AppDispatch = useDispatch();
    const { makes, loading, error } = useSelector((state: AppState) => state.make);
    const [newMake, setNewMake] = React.useState<Make | null>(null);

    useEffect(() => {
        dispatch(fetchMakes());
    }, [dispatch, newMake]);

    const handleDelete = (id: string) => {
        dispatch(deleteMake(id))
            .then(() => {
                toast.success('Make deleted successfully');
            })
            .catch((error) => {
                console.log('Error deleting make: ', error.message);
                toast.error('Error deleting make: ' + error.message);
            });
    };

    const handleMakeCreated = (_newMake: Make) => {
        setNewMake(_newMake);
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mt-5" style={{ width: '100%' }}>
            <div className="row">
                <div className="col">
                    <h1 className="mb-4">Makes</h1>
                </div>
                    <div className="col">
                        <AddNewMake onMakeCreated={handleMakeCreated} />
                    </div>
            </div>
            <div className="row">
                {Array.isArray(makes) && makes.map(make => (
                    <div className="col-md-4 mb-4" key={make._id}>
                        <div className="card">
                            <div className="card-body">
                                <h3 className="card-title">{make.name}</h3>
                                <button className="btn btn-danger" onClick={() => handleDelete(make._id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MakeList;