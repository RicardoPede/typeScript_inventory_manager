import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { register } from "../store/slices/authSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Register() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        name: '',
        dni: '',
        phone: '',
        address: '',
        city: ''
    });

    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await dispatch(register(formData));
            toast.success('Usuario registrado');
            navigate('/login');
        } catch (error) {
            console.log(error);
            toast.error('Error al registrar usuario');
        }
    }

    return (
        <div className="container-flex m-5">
            <h1 className="mb-4">Register</h1>
            <form onSubmit={handleRegister} className=" border border-success rounded p-5 ">
                <div className="row">
                    <div className="col-12 d-md-flex">
                        <div className="form-group col-md-6">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="dni">DNI</label>
                            <input
                                type="text"
                                className="form-control"
                                id="dni"
                                name="dni"
                                placeholder="DNI"
                                value={formData.dni}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-12 d-md-flex">
                        <div className="form-group col-md-6">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-12 d-md-flex">
                        <div className="form-group col">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="col-12 d-md-flex">
                        <div className="form-group col">
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                name="address"
                                placeholder="Address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="col-12 d-md-flex">
                        <div className="form-group col-md-6">
                            <label htmlFor="city">City</label>
                            <input
                                type="text"
                                className="form-control"
                                id="city"
                                name="city"
                                placeholder="City"
                                value={formData.city}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="phone">Phone</label>
                            <input
                                type="text"
                                className="form-control"
                                id="phone"
                                name="phone"
                                placeholder="Phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="d-grid gap-5 d-md-flex justify-content-md-end">
                    <button onClick={() => navigate('/login')} className="btn btn-link btn-sm">Login</button>
                    <button type="submit" className="btn btn-primary me-md-2 btn-sm">Register</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}