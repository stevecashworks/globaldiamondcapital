import React from "react";
import styled from "styled-components";
import { Carousel } from "react-bootstrap";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import Stein from "../assets/doctors/doctor_1.jpg";
import Alexa from "../assets/doctors/doctor_2.jpg";
import Rebecca from "../assets/doctors/doctor_3.jpg";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

// Styled Components
const Section = styled.div`
  padding: 100px 0;
  background-color: #f9f9f9;
`;
const Slide = styled.div`
  display: flex; /* Use flexbox */
  justify-content: center; /* Center horizontally */
  gap: 20px; /* Spacing between cards */
  flex-wrap: wrap; /* Wrap cards on smaller screens */
  padding: 10px; /* Optional padding for spacing around */
`;

const CardDoctor = styled.div`
  background-color: #ffffff;
  border-radius: 15px; /* Curved edges */
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 260px; /* Slimmer width */
  height: 350px; /* Longer height */

  &:hover {
    transform: scale(1.05); /* Slight zoom on hover */
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }
`;

const Header = styled.div`
  position: relative;

  img {
    width: 100%;
    height: 60%; /* Adjusted height for longer cards */
    object-fit: cover; /* Maintain aspect ratio, crop overflow */
    display: block;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }

  .meta {
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    gap: 10px;

    a {
      background-color: #ffffff;
      color: #1abc9c;
      border-radius: 50%;
      padding: 8px;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.3s ease, color 0.3s ease;

      &:hover {
        background-color: #1abc9c;
        color: #ffffff;
      }
    }
  }
`;
const CurvedButton = styled.div`
  width: 50px;
  height: 40px;
  background-color: #1abc9c;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px 15px;
  cursor: pointer;
`;
const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 15px;
`;

const Body = styled.div`
  padding: 15px;
  text-align: center;

  p {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 5px;
  }

  span {
    font-size: 0.85rem;
    color: #888;
  }
`;

// React Component
const DoctorsCarousel = () => {
  // Repeat cards to fill three slides
  const doctors = [
    { name: " Stein Albert", specialty: "Cardiology", image: Stein },
    { name: " Alexa Melvin", specialty: "Dental", image: Alexa },
    {
      name: "Rebecca Steffany",
      specialty: "General Health",
      image: Rebecca,
    },
    { name: "Stein Albert", specialty: "Cardiology", image: Stein },
    { name: "Alexa Melvin", specialty: "Dental", image: Alexa },
    {
      name: "Rebecca Steffany",
      specialty: "General Health",
      image: Rebecca,
    },
    { name: "Stein Albert", specialty: "Cardiology", image: Stein },
    { name: "Alexa Melvin", specialty: "Dental", image: Alexa },
    {
      name: "Rebecca Steffany",
      specialty: "General Health",
      image: Rebecca,
    },
  ];

  // Group doctors into slides
  const slides = [];
  for (let i = 0; i < doctors.length; i += 3) {
    slides.push(doctors.slice(i, i + 3));
  }

  return (
    <Section>
      <div className="container">
        <h1 className="text-center mb-5">Our Team</h1>
        <Carousel indicators={true} controls={false}>
          {slides.map((slide, slideIndex) => (
            <Carousel.Item key={slideIndex}>
              <Slide>
                {slide.map((doctor, index) => (
                  <CardDoctor key={index}>
                    <Header>
                      <img src={doctor.image} alt={doctor.name} />
                      <div className="meta">
                        <a href="#">
                          <FaPhoneAlt />
                        </a>
                        <a href="#">
                          <FaWhatsapp />
                        </a>
                      </div>
                    </Header>
                    <Body>
                      <p>{doctor.name}</p>
                      <span>{doctor.specialty}</span>
                    </Body>
                  </CardDoctor>
                ))}
              </Slide>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      <ButtonsContainer>
        <CurvedButton>
          <IoIosArrowRoundBack
            style={{ fontSize: "24px", fontWeight: "bold" }}
          />
        </CurvedButton>
        <CurvedButton>
          <IoIosArrowRoundForward style={{ fontSize: "24px" }} />
        </CurvedButton>
      </ButtonsContainer>
    </Section>
  );
};

export default DoctorsCarousel;
