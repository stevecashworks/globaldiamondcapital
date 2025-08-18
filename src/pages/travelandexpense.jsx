import React from "react";
import styled, { keyframes } from "styled-components";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import Header from "../components/header";
import Footer from "../components/footer";
import airplaneImg from "../assets/airplane.jpg";
const typing = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

const blink = keyframes`
  50% { border-color: transparent; }
`;

const HeroSection = styled.section`
  background-image: url("../assets/airplane.jpg");
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  align-items: center;
  height: 90vh;
  color: #ecf0f1;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  text-align: center;
  padding: 0 20px;
`;
const HeroBackground = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  align-items: center;
  color: #ecf0f1;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  text-align: center;
  padding: 0 20px;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  white-space: nowrap;
  border-right: 2px solid #ecf0f1;

  animation: ${typing} 3s steps(30, end), ${blink} 0.5s step-end infinite;

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

const FeatureCard = styled.div`
  background: #2c3e50;
  border-radius: 8px;
  padding: 20px;
  color: #ecf0f1;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.5);
  }

  i {
    font-size: 2rem;
    margin-bottom: 15px;
    color: #1abc9c;
  }
`;

const TravelExpensePage = () => {
  return (
    <>
      <Header />

      <HeroSection>
        <HeroBackground src={airplaneImg} />
        <Content>
          <Title>Your Adventure Starts Here</Title>
          <Subtitle>Manage expenses seamlessly and travel smarter</Subtitle>
          <Button href="/register" variant="success" size="lg">
            Get Started
          </Button>
        </Content>
      </HeroSection>

      <Container className="my-5">
        <Row className="text-center mb-4">
          <Col>
            <h2 className="text-secondary">Features</h2>
            <p className="text-muted">
              Everything you need to make your trips worry-free
            </p>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={4} className="mb-4">
            <FeatureCard>
              <i className="bi bi-wallet2"></i>
              <h4>Expense Tracking</h4>
              <p>
                Easily keep track of your travel expenses and stay within
                budget.
              </p>
            </FeatureCard>
          </Col>
          <Col xs={12} md={4} className="mb-4">
            <FeatureCard>
              <i className="bi bi-geo-alt"></i>
              <h4>Travel Planner</h4>
              <p>Plan your trips with our intuitive travel scheduling tools.</p>
            </FeatureCard>
          </Col>
          <Col xs={12} md={4} className="mb-4">
            <FeatureCard>
              <i className="bi bi-shield-check"></i>
              <h4>Insurance Support</h4>
              <p>
                Get quick access to health and travel insurance during your
                journeys.
              </p>
            </FeatureCard>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default TravelExpensePage;
