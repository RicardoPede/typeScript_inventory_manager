import { Container } from 'react-bootstrap';

export default function Footer() {
  return (
    <footer className="bg-light py-3" style={{ background: 'linear-gradient(to right, #6a11cb, #2575fc)' }}>
      <Container className="text-center">
        <span>&copy; 2024 Gestión de Equipos. Todos los derechos reservados.</span>
      </Container>
    </footer>
  );
}