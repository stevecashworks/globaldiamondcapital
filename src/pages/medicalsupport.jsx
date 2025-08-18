import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import styled from "styled-components";
import Header from "../components/header";
import Footer from "../components/footer";
import { TbEmergencyBed } from "react-icons/tb";
import { FaHandHoldingMedical } from "react-icons/fa6";
import { SlSupport } from "react-icons/sl";
const MainWrapper = styled.div`
  padding: 60px 0;
  background-color: #f5f5f5; // You can customize background color here
`;

const CardWrapper = styled(Card)`
  margin-bottom: 30px;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const IconWrapper = styled.div`
  font-size: 36px;
  color: #1abc9c;
  margin-bottom: 15px;
`;

const MedicalSupportMain = () => {
  return (<>
      <Header />
    <MainWrapper>
      <Container>
        <Row>
          <Col md={6} lg={4}>
            <CardWrapper>
              <Card.Body>
                <IconWrapper>
                  <SlSupport />
                </IconWrapper>
                <Card.Title>Consultation Services</Card.Title>
                <Card.Text>
                  Get expert medical consultations for your needs. Book an
                  appointment online.
                </Card.Text>
              </Card.Body>
            </CardWrapper>
          </Col>
          <Col md={6} lg={4}>
            <CardWrapper>
              <Card.Body>
                <IconWrapper>
                  <TbEmergencyBed />
                </IconWrapper>
                <Card.Title>Emergency Support</Card.Title>
                <Card.Text>
                  24/7 emergency medical support available. Reach out to us
                  anytime.
                </Card.Text>
              </Card.Body>
            </CardWrapper>
          </Col>
          <Col md={6} lg={4}>
            <CardWrapper>
              <Card.Body>
                <IconWrapper>
                  <FaHandHoldingMedical />
                </IconWrapper>
                <Card.Title>Health Resources</Card.Title>
                <Card.Text>
                  Access a variety of health resources and guides to improve
                  your well-being.
                </Card.Text>
              </Card.Body>
            </CardWrapper>
          </Col>
        </Row>
      </Container>
      <Footer />
    </MainWrapper>
  </>
  );
};

export default MedicalSupportMain;
