import React from "react";
import styled from "styled-components";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import TestimonialImg1 from "../assets/person/person_1.jpg";
import TestimonialImg2 from "../assets/person/person_2.jpg";
import TestimonialImg3 from "../assets/person/person_3.jpg";

// Styled Components
const Section = styled.div`
  padding: 50px 0;
  background-color: #f9f9f9;
`;

const Header = styled.h1`
  text-align: center;
  margin-bottom: 40px;
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 30px;
`;

const TestimonialRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
  flex-direction: row-reverse;
`;

const TestimonialCard = styled.div`
  flex: 0 1 260px; /* Adjust card width */
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    flex: 0 1 100%;
  }
`;

const CardHeader = styled.div`
  img {
    width: 100%;
    height: auto;
  }
`;

const CardBody = styled.div`
  padding: 20px;

  h5 {
    font-size: 1.25rem;
    margin-bottom: 10px;
    color: #1abc9c;
  }

  p {
    font-size: 1rem;
    color: #666;
    margin-bottom: 20px;
  }
`;

const Rating = styled.div`
  color: #f1c40f;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  gap: 5px;
`;

// React Component
const TestimonialSection = () => {
  const testimonials = [
    {
      name: "Roger Adams",
      review:
        "This service was amazing! They exceeded my expectations in every way.",
      rating: 4.5,
      image: TestimonialImg1,
    },
    {
      name: "Aletta Simmons",
      review:
        "I am truly impressed with the professionalism and quality of work!",
      rating: 5,
      image: TestimonialImg2,
    },
    {
      name: "Jonathan Moore",
      review:
        "The team was very helpful and ensured my concerns were addressed promptly.",
      rating: 4,
      image: TestimonialImg3,
    },
  ];

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} />
        ))}
        {halfStar && <FaStarHalfAlt />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} />
        ))}
      </>
    );
  };

  return (
    <Section>
      <div className="container">
        <Header>What Our Clients Say</Header>
        <TestimonialRow>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index}>
              <CardHeader>
                <img src={testimonial.image} alt={testimonial.name} />
              </CardHeader>
              <CardBody>
                <h5>{testimonial.name}</h5>
                <p>{testimonial.review}</p>
                <Rating>{renderStars(testimonial.rating)}</Rating>
              </CardBody>
            </TestimonialCard>
          ))}
        </TestimonialRow>
      </div>
    </Section>
  );
};

export default TestimonialSection;
