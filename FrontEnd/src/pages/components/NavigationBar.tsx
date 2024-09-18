import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AppState } from '../../store/store';
import { logout } from '../../store/slices/authSlice';

export default function NavigationBar() {
    const { isAuthenticated, user } = useSelector((state: AppState) => state.auth);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout())
    };

    return (
        <Navbar className='border' bg="light" expand="lg" style={{ background: 'linear-gradient(to right, #6a11cb, #2575fc)' }}>
            <Container>
                <Navbar.Brand href="/">Gestión de Equipos Informáticos</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {isAuthenticated ? (
                            <>
                                <span className="nav-link">Bienvenido, {user?.name}</span>
                                <Button variant='outline-danger' onClick={handleLogout}>Logout</Button>
                            </>
                        ) : (
                            <>
                                <NavLink to="/login" className="nav-link">
                                    <Button variant='outline-success' className="fw-bold text-uppercase">Login</Button>
                                </NavLink>
                                <NavLink to="/register" className="nav-link">
                                    <Button variant='outline-primary' className="fw-bold text-uppercase">Register</Button>
                                </NavLink>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}