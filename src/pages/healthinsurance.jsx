import React from "react";
import styled from "styled-components";
import { Container, Row, Col, Accordion, Form, Button, Card } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import Header from "../components/header";
import Footer from "../components/footer";
import service from "../assets/service-2.jpg"

const HeroSection = styled.section`
  background-image: url("path-to-your-hero-image.jpg");
  background-size: cover;
  background-position: center;
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color:#ecf0f1 ;
  background-image:url(${service});
  background-position:center;
  object-fit:cover;
  text-shadow: 2px 2px 4px rgb(0,0,0,0.5) ;
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

const HealthInsurancePage = () => {
  return (
    <>
      <Header/>

      <HeroSection>
        <Title>Comprehensive Health Insurance</Title>
        <Subtitle>
          Protect yourself and your loved ones with our tailored plans.
        </Subtitle>
      </HeroSection>

      <Container className="my-5">
        <Row className="text-center mb-4">
          <Col>
            <h2 className="text-secondary">Health Insurance Plans</h2>
            <p className="text-muted">
              Choose the plan that fits your needs and budget.
            </p>
          </Col>
        </Row>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <i className="bi bi-shield-check me-2"></i> Basic Plan - $50/month
            </Accordion.Header>
            <Accordion.Body>
              The Basic Plan is ideal for individuals looking for essential
              health coverage. It includes hospitalization, outpatient
              consultations, and emergency care at an affordable rate. Optional
              add-ons such as dental and vision coverage are available for
              additional fees.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <i className="bi bi-shield-plus me-2"></i> Family Plan - $150/month
            </Accordion.Header>
            <Accordion.Body>
              The Family Plan offers comprehensive coverage for your entire
              family, including pediatric and maternity benefits. This plan
              covers routine checkups, vaccinations, and specialized care for
              every member of your household.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>
              <i className="bi bi-award me-2"></i> Premium Plan - $300/month
            </Accordion.Header>
            <Accordion.Body>
              The Premium Plan provides extensive coverage, including wellness
              programs, alternative therapies, and worldwide medical access.
              Ideal for those who want the best healthcare available.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>

      <Container className="my-5">
        <Row className="text-center mb-4">
          <Col>
            <h2 className="text-secondary">Billing Information</h2>
            <p className="text-muted">
              Complete your payment securely to activate your health insurance.
            </p>
          </Col>
        </Row>
        <Card className="p-4">
          <Form>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formFullName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your full name" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="email" placeholder="Enter your email" />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formPhone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="text" placeholder="Enter your phone number" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formPlan">
                  <Form.Label>Select Plan</Form.Label>
                  <Form.Select>
                    <option value="Basic">Basic Plan - $50/month</option>
                    <option value="Family">Family Plan - $150/month</option>
                    <option value="Premium">Premium Plan - $300/month</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formCardNumber">
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control type="text" placeholder="1234 5678 9012 3456" />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="formExpiryDate">
                  <Form.Label>Expiry Date</Form.Label>
                  <Form.Control type="text" placeholder="MM/YY" />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="formCVV">
                  <Form.Label>CVV</Form.Label>
                  <Form.Control type="text" placeholder="123" />
                </Form.Group>
              </Col>
            </Row>
            <div className="text-center">
              <Button variant="primary" type="submit">
                Pay Now
              </Button>
            </div>
          </Form>
        </Card>
      </Container>
      <Footer/>

    </>
  );
};

export default HealthInsurancePage;
