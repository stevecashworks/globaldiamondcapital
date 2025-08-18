import styled from "styled-components";
import { useEffect } from "react";
// import { initAOS, applyAOS } from "../utils";
import aboutImage from "../assets/holdingHands.jpg";

const Container = styled.div`
  width: 100%;
  background-color:#1c1c1c ; /* Dark gray background */
  color:#ecf0f1 ; /* Light gray text */
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    padding: 6rem 2rem;
  }
`;

const TextContainer = styled.div`
  flex: 1;
  margin-bottom: 2rem;
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
    margin-bottom: 0;
    margin-right: 2rem;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  font-family: 'Montserrat', sans-serif;

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Description = styled.p`
  font-size: 1rem;
  line-height: 1.8;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Highlight = styled.span`
  color: #1abc9c; /* Teal highlight */
  font-weight: bold;
`;

const Button = styled.a`
  padding: 0.8rem 2rem;
  font-size: 1rem;
  background-color: #1abc9c;
  color: #fff;
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #16a085;
  }
`;
const ImageContainer=styled.div`

width:600px;
`

const Image = styled.img`
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
  object-fit: cover;
  height:400px;

  @media (min-width: 768px) {
    max-width: 500px;
  }
`;

const About = () => {
  useEffect(() => {
    // initAOS();
    // applyAOS("about-text", "zoom-in");
    // applyAOS("about-image", "fade-out");
  }, []);

  return (
    <Container id="about-us">
      <TextContainer id="about-text">
        <Title>About Us</Title>
        <Description>
          At <Highlight>HealthSupport</Highlight>, we are dedicated to enhancing your well-being and financial stability.
          Our wide range of services, including <Highlight>medical support</Highlight>, <Highlight>investment plans</Highlight>, 
          and <Highlight>health insurance</Highlight>, ensures that you are covered in every aspect of life.
        </Description>
        <Button href="#services">Learn More</Button>
      </TextContainer>
      <ImageContainer id="about-image">
        <Image src={aboutImage} alt="About Us" />
      </ImageContainer>
    </Container>
  );
};

export default About;
