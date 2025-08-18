import React from "react";
import styled from "styled-components";
import { Container, Row, Col, Accordion, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import Header from "../components/header";
import Footer from "../components/footer";
import doctorImg from "../assets/doctors/doctor_1.jpg";
const HeroSection = styled.section`
  background-image: url(${doctorImg});
  background-size: cover;
  background-position: center;
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #ecf0f1;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  text-align: center;
  padding: 0 20px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    font-size: 3.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 30px;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const HealthBenefitsPage = () => {
  return (
    <>
      <Header />
      <HeroSection>
        <Title>Invest in Your Health</Title>
        <Subtitle>
          Your health is your wealth. Discover amazing benefits.
        </Subtitle>
        <Button href="/register" variant="success">Get started</Button>
      </HeroSection>

      <Container className="my-5">
        <Row className="text-center mb-4">
          <Col>
            <h2 className="text-secondary">Health Benefits</h2>
            <p className="text-muted">
              Empowering you to lead a healthier, happier life
            </p>
          </Col>
        </Row>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <i className="bi bi-heart me-2"></i> Heart Health
            </Accordion.Header>
            <Accordion.Body>
              Maintaining heart health is essential for longevity and overall
              well-being. Regular physical activity, such as walking, jogging,
              or cycling, can reduce the risk of heart disease by improving
              blood circulation and lowering blood pressure. Additionally, a
              heart-healthy diet rich in fruits, vegetables, whole grains, and
              lean proteins can help manage cholesterol levels and reduce
              inflammation. Avoiding smoking and excessive alcohol consumption
              also plays a crucial role in keeping your heart strong.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <i className="bi bi-brain me-2"></i> Mental Wellness
            </Accordion.Header>
            <Accordion.Body>
              Mental wellness is a cornerstone of overall health. Practicing
              mindfulness and stress management techniques, such as meditation
              and deep breathing, can significantly enhance mental clarity and
              emotional resilience. A balanced diet, rich in omega-3 fatty acids
              and antioxidants, supports brain function and reduces the risk of
              cognitive decline. Building social connections and seeking support
              when needed are equally important for maintaining emotional
              well-being.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>
              <i className="bi bi-droplet me-2"></i> Hydration
            </Accordion.Header>
            <Accordion.Body>
              Staying hydrated is vital for every aspect of bodily function.
              Water aids in digestion, regulates body temperature, and supports
              nutrient absorption. Drinking enough water can also boost energy
              levels, improve skin health, and aid in weight management. Experts
              recommend consuming at least 8-10 glasses of water daily, with
              more required during physical activities or in hot climates.
            </Accordion.Body>
          </Accordion.Item>
          {/* Add more accordion items as needed */}
        </Accordion>
      </Container>
      <Footer />
    </>
  );
};

export default HealthBenefitsPage;
