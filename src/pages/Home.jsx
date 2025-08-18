import styled, { keyframes } from "styled-components";
import Header from "../components/header";
import backgroundVid from "../assets/backgroundVid.mp4";
import { useEffect, useState } from "react";
import HealthCenter from "../components/aboutus";
import DoctorsCarousel from "../components/doctors";
import Testimonials from "../components/tetsimonials";
import Partners from "../components/partners";
import Feedback from "../components/feedback";
import Footer from "../components/footer";
import Plans from "../components/plans";
import observeClass, { animatedClasses } from "../aos";
import fetchData from "../fetchData";
import { developmentApiEntryPoint } from "./register";
import certificate from "../assets/Jonathan Crimson.png"
import {Image} from  "react-bootstrap"

const Container = styled.div`
  width: 100vw;
`;
const fade = keyframes`
from{
  opacity:0;
  
}
to{
  opacity:1;
}
`;

const Hero = styled.div`
  width: 100vw;
  height: 450px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ecf0f1; /* Light text color for contrast */
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
`;

const Shade = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8); /* Semi-transparent black */
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 1;
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 2rem;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    font-family: "Montserrat", sans-serif;

    @media (min-width: 768px) {
      font-size: 3rem;
    }
  }

  p {
    font-size: 1rem;
    margin-bottom: 2rem;

    @media (min-width: 768px) {
      font-size: 1.2rem;
    }
  }

  a {
    padding: 0.8rem 2rem;
    font-size: 1rem;
    background-color: #1abc9c; /* Teal button */
    color: #fff;
    text-decoration: none;
    border-radius: 8px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #16a085; /* Dark teal */
    }
  }
`;
const Cursor = styled.span`
  animation: ${fade} 1s ease infinite;
  color: #1abc9c;
  margin-left: 5px;
`;

const Home = () => {
  useEffect(() => {
    animatedClasses.forEach((className) => {
      observeClass(className);
    });
    fetchData(`
      ${developmentApiEntryPoint}`,
      ()=>{},
      ()=>{}
    )
  }, []);
  const completeText =
    "Your well-being is our priority. Start your journey with us today.";
  const [char, setChar] = useState(0);
  useEffect(() => {
    setInterval(() => {
      setChar((char) => (char < completeText.length ? char + 1 : 0));
    }, 100);
  }, []);
  return (
    <Container>
      <Header />
      <Hero>
        <Video src={backgroundVid} autoPlay loop muted />
        <Shade />
        <Content>
          <h1 style={{fontSize:"22px"}}className="fadeinUp">Welcome to Global Diamond Capitals</h1>
          <p>
            {completeText.substr(0, char)}
            <Cursor>|</Cursor>
          </p>
          <a href="/register">Get Started</a>
        </Content>
      </Hero>
      <HealthCenter />
      <Plans />
      <DoctorsCarousel />
      <Image src={certificate} style={{width:"80%", display:"block", margin:"20px auto"}} fluid />
      <Partners />
      <Testimonials />
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d212145.78364952744!2d-84.6117196!3d33.818045!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f5045d6993098d%3A0x66fede2f990b630b!2sAtlanta%2C%20GA%2C%20USA!5e0!3m2!1sen!2sng!4v1734686788470!5m2!1sen!2sng"
        style={{
          border: 0,
          margin: "20px auto",
          width: "100%",
          height: "400px",
        }}
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
      <Feedback />
      <Footer />
    </Container>
  );
};

export default Home;