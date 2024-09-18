import React, { useState, useEffect } from 'react';
import { useAxios } from '../../contexts/AxiosContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface IUser {
    _id?: string;
    name: string;
    username: string;
    email: string;
    dni: string;
    phone: string;
    address: string;
    city: string;
    role?: string;
    password?: string;
}

const Users = () => {
    const axios = useAxios();
    const [users, setUsers] = useState<IUser[]>([]);
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleCreateOrUpdateUser = async (user: IUser) => {
        try {
            if (isEditing && user._id) {
                await axios.put(`http://localhost:4000/api/users/${user._id}`, user);
                toast.success('User updated successfully');
            } else {
                await axios.post('http://localhost:4000/api/users', user);
                toast.success('User created successfully');
            }
            fetchUsers();
            handleCancel();
        } catch (error) {
            console.error('Error saving user:', error);
            toast.error('Error saving user');
        }
    };

    const handleDeleteUser = async (id: string) => {
        try {
            await axios.delete(`http://localhost:4000/api/users/${id}`);
            toast.success('User deleted successfully');
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error('Error deleting user');
        }
    };

    const handleEditUser = (user: IUser) => {
        setSelectedUser(user);
        setIsEditing(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSelectedUser({ ...selectedUser, [name]: value } as IUser);
    };

    const handleCancel = () => {
        setSelectedUser(null);
        setIsEditing(false);
    }

    return (
        <div className="container-fluid mt-5">
            <ToastContainer />
            <h1 className="mb-4">Users</h1>
            <div className="row border">
                <div className="col-md-4">
                    <h2>{isEditing ? 'Edit User' : 'Create User'}</h2>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        if (selectedUser) handleCreateOrUpdateUser(selectedUser);
                    }}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" name="name" value={selectedUser?.name || ''} onChange={handleInputChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" className="form-control" id="username" name="username" value={selectedUser?.username || ''} onChange={handleInputChange} required />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='password' className='form-label'>Password</label>
                            <input type='password' className='form-control' id='password' name='password' value={selectedUser?.password || ''} onChange={handleInputChange} required />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='role' className='form-label'>Role</label>
                            <select id='role' name='role' className='form-select' value={selectedUser?.role || ''} onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value } as IUser)}>
                                <option value=''>Select</option>
                                <option value='admin'>Admin</option>
                                <option value='user'>User</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" name="email" value={selectedUser?.email || ''} onChange={handleInputChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="dni" className="form-label">DNI</label>
                            <input type="text" className="form-control" id="dni" name="dni" value={selectedUser?.dni || ''} onChange={handleInputChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Phone</label>
                            <input type="text" className="form-control" id="phone" name="phone" value={selectedUser?.phone || ''} onChange={handleInputChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Address</label>
                            <input type="text" className="form-control" id="address" name="address" value={selectedUser?.address || ''} onChange={handleInputChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="city" className="form-label">City</label>
                            <input type="text" className="form-control" id="city" name="city" value={selectedUser?.city || ''} onChange={handleInputChange} required />
                        </div>
                        <button type="submit" className="btn btn-primary">{isEditing ? 'Update' : 'Create'}</button>
                        <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                    </form>
                </div>
                <div className="col-md-8">
                    <h2>User List</h2>
                    <div style={{ overflow: 'auto'}}>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>DNI</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>City</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.dni}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.address}</td>
                                    <td>{user.city}</td>
                                    <td>
                                        <button className="btn btn-warning me-2" onClick={() => handleEditUser(user)}>Edit</button>
                                        <button className="btn btn-danger" onClick={() => handleDeleteUser(user._id!)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Users;