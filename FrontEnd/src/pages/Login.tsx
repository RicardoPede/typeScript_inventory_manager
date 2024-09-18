import axios from "axios";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/authSlice";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { User } from "../store/slices/authSlice";
import { Button, Form, Container, Row, Col } from 'react-bootstrap';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate: NavigateFunction = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/auth/login', {
                username,
                password
            });
            if (response.status === 200) {
                const user: User = { 
                    _id: response.data.user._id,
                    name: response.data.user.name,
                    username: response.data.user.username,
                    avatar: response.data.user.avatar
                 };
                dispatch(login({ user, token: response.data.token }));
                toast.success('Inicio de sesión exitoso');
                navigate('/');
            } else {
                toast.error('Error al iniciar sesión');
            }
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                toast.error(`Error: ${error.response?.data.message || error.message}`);
            } else {
                console.error('Error desconocido: ', error);
                toast.error('Error en el inicio de sesión');
            }
        }
    }

    return (
        <Container fluid className="d-flex align-items-center min-vh-100" style={{ background: 'linear-gradient(to right, #6a11cb, #2575fc)' }}>
            <Row className="w-100">
                <Col lg={6} className="d-flex align-items-center justify-content-center py-5">
                    <div className="w-100 border rounded p-2" style={{ maxWidth: '400px', color: 'blue' }}>
                        <div className="text-center mb-4">
                            <h1 className="h3 mb-3 font-weight-normal">Login</h1>
                            <p className="text-muted">
                                Enter your username below to login to your account
                            </p>
                        </div>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="text" className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="username"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="password" className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <a href="/forgot-password" className="d-block mt-2 text-end text-decoration-underline">
                                    Forgot your password?
                                </a>
                            </Form.Group>
                            <Button type="submit" className="w-100 mb-2">
                                Login
                            </Button>
                            <Button variant="outline-primary" className="w-100">
                                Login with Google
                            </Button>
                        </Form>
                        <div className="text-center mt-4">
                            Don't have an account?{" "}
                            <a href="#" className="text-decoration-underline">
                                Sign up
                            </a>
                        </div>
                    </div>
                </Col>
                <Col lg={6} className="d-none d-lg-block bg-light position-relative z-index">
                    <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to expand, rgba(106, 17, 203, 0.2), rgba(37, 117, 252, 0.5))' }}></div>
                    <img
                        src="/assets/mantenimiento-informatico-correctivo.jpg"
                        alt="Image"
                        className="img-fluid h-100 w-100 object-fit-cover"
                    />
                </Col>
            </Row>
            <ToastContainer />
        </Container>
    )
}