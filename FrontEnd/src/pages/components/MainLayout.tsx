import NavigationBar from './NavigationBar';
import MenuIndex from './MenuIndex';
import Footer from './Footer';
import { Col, Container, Row } from 'react-bootstrap';

import { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Container fluid className="p-0 h-100">
      <Row className="g-0 h-100">
        <Col xs={1} className="p-0 h-100" style={{height: 'auto', overflowY: 'auto'}}>
          <MenuIndex />
        </Col>
        <Col xs={11} className="p-0 h-100 d-flex flex-column">
          <NavigationBar />
          <div className="content flex-grow-1">
            {children}
          </div>
        </Col>
      </Row>
      <Footer />
    </Container>
  );
};

export default MainLayout;