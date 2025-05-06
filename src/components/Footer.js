import { Container, Row, Col } from "react-bootstrap";
// import navIcon1 from "../assets/nav-icon1.svg";
// import navIcon2 from "../assets/nav-icon2.svg";


export const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center">
          <Col size={12} sm={6} className="text-center text-sm-end">
            <p>Copyright 2025. All Rights Reserved</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}