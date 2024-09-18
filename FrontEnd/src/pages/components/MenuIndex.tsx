import { Col, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Triangle, SquareTerminal, Box, PlusSquare, Layers, Users, FileText, Settings, LifeBuoy, SquareUser } from 'lucide-react';
import { Placement } from 'react-bootstrap/esm/types';
import { NavLink } from 'react-router-dom';

export default function MenuIndex() {
  return (
    <Col className="d-flex flex-column align-items-center border-end bg-light p-0 h-100" style={{ background: 'linear-gradient(to right, #6a11cb, #6a11cb)', minHeight: '90vh' }}>
      <div className="border-bottom w-100 p-2 d-flex justify-content-center mt-3">
        <Button variant="outline-secondary" size="sm" aria-label="Home">
          <Triangle />
        </Button>
      </div>

      <nav className="d-flex flex-column align-items-center w-100 p-2 flex-grow-1">
        {renderTooltipButton(SquareTerminal, "Dashboard", "/")}
        {renderTooltipButton(Box, "Inventario", "/inventory")}
        {renderTooltipButton(PlusSquare, "Agregar Equipo", "/")}
        {renderTooltipButton(Layers, "Categorías", "/category")}
        {renderTooltipButton(Users, "Usuarios", "/user")}
        {renderTooltipButton(FileText, "Reportes", "/reports")}
        {renderTooltipButton(Settings, "Settings", "/")}
      </nav>

      <nav className="mt-auto d-flex flex-column align-items-center w-100 p-2">
        {renderTooltipButton(LifeBuoy, "Help", "/")}
        {renderTooltipButton(SquareUser, "Account", "/")}
      </nav>
    </Col>
  );
}

function renderTooltipButton(IconComponent: React.ElementType, tooltipText: string, to: string, placement: Placement = "right") {
    return (
      <OverlayTrigger
        placement={placement}
        overlay={<Tooltip>{tooltipText}</Tooltip>}
      >
        <NavLink to={to} className="p-0 mb-2">
          <Button variant="link" className="p-0">
            <IconComponent size={24} />
          </Button>
        </NavLink>
      </OverlayTrigger>
    );
  }