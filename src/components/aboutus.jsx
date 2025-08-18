import React from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import doctorBG from "../assets/bg-doctor.png";
import moneyBG from "../assets/money.png";
import Services from "./services";
// Animation for fade-in effect

const Highlight = styled.span`
  color: #1abc9c; /* Teal highlight */
  font-weight: bold;
`;

const SectionTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Button = styled.a`
  padding: 0.8rem 2rem;
  font-size: 1rem;
  background-color: #1abc9c;
  color: #fff;
  text-decoration: none;
  border-radius: 8px;
  margin-top: 40px;
  display: block;
  width: fit-content;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #16a085;
  }
`;
const Description = styled.p`
  color: grey;
  margin-bottom: 1.5rem;
`;

const ImageContainer = styled.div``;

const PageSection = styled.div`
  padding: 3rem 0;
  background: ${(props) => (props.light ? "#f8f9fa" : "#fff")};
`;

const HealthCenter = () => {
  return (
    <>
      <PageSection light>
        <Container>
          <Services />
        </Container>

        <Container>
          <Row className="align-items-center">
            <Col
              lg={6}
              className="py-3 fadeinRight"
              style={{ paddingLeft: "20px" }}
            >
              <SectionTitle>About Us</SectionTitle>
              <Description className="mb-6">
                At <Highlight>Global diamond capital</Highlight>, we are dedicated to
                enhancing your well-being and financial stability. Our wide
                range of services, including{" "}
                <Highlight>Asset management</Highlight>,{" "}
                <Highlight>investment plans</Highlight>, and{" "}
                <Highlight>health insurance</Highlight>, ensures that you are
                covered in every aspect of life.
              </Description>
              <Button href="#services">Learn More</Button>
            </Col>
            <Col lg={6} className="fadeinRight">
              <ImageContainer id="aboutImage">
                <img src={moneyBG} alt="Health Center" className="img-fluid" />
              </ImageContainer>
            </Col>
          </Row>
        </Container>
      </PageSection>
    </>
  );
};

export default HealthCenter;
