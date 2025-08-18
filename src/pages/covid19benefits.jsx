// Import necessary libraries and components
import React from "react";
import styled from "styled-components";
import { Container, Row, Col, Card, Button, Image,DropdownDivider } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import Header from "../components/header"; // Replace with your reusable Header component
import Footer from "../components/footer"; // Replace with your reusable Footer component
import doctorImg from "../assets/doctors/doctor_2.jpg";
import { HighLight } from "./login";

// Styled Components
const PageWrapper = styled.div`
  background-color: #1c1c1c; // Background color from your palette
  color: #ecf0f1; // Text color from your palette
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const HeroSection = styled.div`
  text-align: center;
  padding: 50px 20px;
  background-color: #2c3e50; // Secondary color
  color: #ecf0f1;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 3.5rem;
    font-weight: bold;
    margin-bottom: 25px;
    color: #1abc9c; // Primary color
  }

  p {
    font-size: 1.2rem;
    max-width: 800px;
    line-height: 1.8;
    text-align: justify;
  }

  img {
    margin-top: 30px;
    max-width: 100%;
    height: auto;
    border-radius: 15px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.8rem;
  margin-bottom: 40px;
  color: #1abc9c; // Primary color
  text-align: center;
`;

const GrantCard = styled(Card)`
  background-color: #1abc9c;
  border: none;
  color: #ecf0f1;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  }

  .card-title {
    font-size: 1.6rem;
    font-weight: bold;
  }

  .card-text {
    color: #1c1c1c; // Darker text color for contrast
    font-size: 1.1rem;
    line-height: 1.5;
  }

  .btn {
    background-color: #16a085; // Highlight color
    border: none;

    &:hover {
      background-color: #1abc9c;
    }
  }
`;

const GrantsSection = styled.div`
  padding: 40px 20px;
  flex-grow: 1;
  background-color: #1c1c1c;
  border-top: 5px solid #16a085;
`;

const TestimonialsSection = styled.div`
  padding: 60px 20px;
  background-color: #2c3e50;
  color: #ecf0f1;
  border-top: 5px solid #1abc9c;
`;

const TestimonialCard = styled(Card)`
  background-color: #1abc9c;
  border: none;
  color: #ecf0f1;
  margin-bottom: 20px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  .card-body {
    font-style: italic;
    font-size: 1.1rem;
  }

  .card-footer {
    font-weight: bold;
    font-size: 1.2rem;
  }
`;

const FaqSection = styled.div`
  padding: 60px 20px;
  background-color: #1c1c1c;
  color: #ecf0f1;
  border-top: 5px solid #16a085;
`;

const FaqItem = styled.div`
  margin-bottom: 25px;

  h5 {
    font-size: 1.4rem;
    margin-bottom: 15px;
    color: #1abc9c;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #ecf0f1;
  }
`;

const Ul = styled.ul`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

const Li = styled.li`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 10px;
`;

const CovidGrantsPage = () => {
  const highlights = [
    "We calculate the global mortality benefits of COVID-19.",
    "Incorporating all actions would save approximately 40.76 trillion USD globally.",
    `Social distancing accounts for 55% of the`,
    "The monetary benefit would be the largest in the US, Japan, and China."
  ];

  return (
    <PageWrapper>
      <Header />

      <HeroSection>
        <Image src={doctorImg} alt="COVID-19 Assistance" />
        <h1>COVID-19 Grants</h1>
        <p className="text-center">
          The rapid spread of COVID-19 motivated countries worldwide to mitigate
          mortality through actions including social distancing, home quarantine,
          school closures, and case isolation. We estimate the global mortality
          benefits of these actions. Using county-level data on COVID-19 from
          January 2020, we project the number of mortalities until September 2020
          and calculate the global mortality benefits using the age- and
          country-specific value of a statistical life (VSL). Implementing all
          four actions above would save approximately 40.76 trillion USD globally,
          with social distancing accounting for 55% of the benefits. The monetary
          benefit would be the largest in the US, Japan, and China. Our findings
          indicate that global actions during COVID-19 have substantial economic
          benefits and must be implemented in response to pandemics.
        </p>
      </HeroSection>

      <GrantsSection>
        <Ul>
          {highlights.map((x, index) => {
            return index === 2 ? (
              <Li>
                {x} <HighLight>global mortality benefits</HighLight>
              </Li>
            ) : (
              <Li>{x}</Li>
            );
          })}
        </Ul>
        <Container>
          <SectionTitle>Available Grants</SectionTitle>
          <Row>
            <Col md={4} className="mb-4">
              <GrantCard>
                <Card.Body>
                  <Card.Title>Healthcare Support</Card.Title>
                  <Card.Text>
                    Assistance for medical bills and healthcare expenses to
                    ensure everyone receives adequate care.
                  </Card.Text>
                  <Button href="/register" variant="primary">
                    <i className="bi bi-arrow-right-circle"></i> Apply Now
                  </Button>
                </Card.Body>
              </GrantCard>
            </Col>
            <Col md={4} className="mb-4">
              <GrantCard>
                <Card.Body>
                  <Card.Title>Small Business Relief</Card.Title>
                  <Card.Text>
                    Financial support for small businesses affected by COVID-19,
                    helping them stay afloat during challenging times.
                  </Card.Text>
                  <Button href="/register" variant="primary">
                    <i className="bi bi-arrow-right-circle"></i> Apply Now
                  </Button>
                </Card.Body>
              </GrantCard>
            </Col>
            <Col md={4} className="mb-4">
              <GrantCard>
                <Card.Body>
                  <Card.Title>Educational Aid</Card.Title>
                  <Card.Text>
                    Grants for students to support online learning, ensuring
                    uninterrupted education.
                  </Card.Text>
                  <Button href="/register" variant="primary">
                    <i className="bi bi-arrow-right-circle"></i> Apply Now
                  </Button>
                </Card.Body>
              </GrantCard>
            </Col>
          </Row>
        </Container>
      </GrantsSection>

      <TestimonialsSection>
        <Container>
          <SectionTitle>Testimonials</SectionTitle>
          <Row>
            <Col md={6}>
              <TestimonialCard>
                <Card.Body>
                  "The grant helped me pay my medical bills and recover from
                  COVID-19. I'm forever grateful."
                </Card.Body>
                <Card.Footer>- John Doe</Card.Footer>
              </TestimonialCard>
            </Col>
            <Col md={6}>
              <TestimonialCard>
                <Card.Body>
                  "My small business survived the pandemic thanks to the relief
                  fund. Highly recommend applying."
                </Card.Body>
                <Card.Footer>- Jane Smith</Card.Footer>
              </TestimonialCard>
            </Col>
          </Row>
        </Container>
      </TestimonialsSection>

      <FaqSection>
        <Container>
          <SectionTitle>Frequently Asked Questions</SectionTitle>
          <FaqItem>
            <h5>Who is eligible for the grants?</h5>
            <p>
              Anyone impacted by COVID-19, including individuals and small
              businesses, may apply. Eligibility requirements vary depending on
              the specific grant.
            </p>
          </FaqItem>
          <FaqItem>
            <h5>How do I apply for a grant?</h5>
            <p>
              Click on the "Apply Now" button under the respective grant
              category and fill out the application form. Ensure you provide
              accurate details to avoid delays in processing.
            </p>
          </FaqItem>
          <FaqItem>
            <h5>What is the processing time for applications?</h5>
            <p>
              Applications are typically processed within 2-4 weeks, depending
              on the volume received. Applicants will be notified via email or
              phone.
            </p>
          </FaqItem>
        </Container>
      </FaqSection>
      <hr />

      <Footer />
    </PageWrapper>
  );
};

export default CovidGrantsPage;
