import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { FaHandsHelping, FaSchool, FaHospital, FaGlobe } from 'react-icons/fa';
import { BsPiggyBank, BsCurrencyExchange } from 'react-icons/bs';
import Header from '../components/header';
import Footer from '../components/footer';
import { useNavigate } from "react-router-dom";

const MainWrapper = styled.div`
  padding: 60px 0;
  background-color: #f5f5f5; // Customize the background as needed
`;

const CardWrapper = styled(Card)`
  margin-bottom: 30px;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const IconWrapper = styled.div`
  font-size: 36px;
  color: #1abc9c;
  margin-bottom: 15px;
`;

const ButtonWrapper = styled(Button)`
  background-color: #1abc9c;
  border: none;
  &:hover {
    background-color: blueviolet;
  }
`;

const MarqueeWrapper = styled.div`
  font-size: 18px;
  color: #1abc9c;
  background-color: #ecf0f1;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  overflow: hidden;
  white-space: nowrap;
  position: relative;
  width: 100%;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(to left, #ecf0f1, rgba(236, 240, 241, 0));
    z-index: 1;
  }

  span {
    display: inline-block;
    animation: scroll 10s linear infinite;
  }

  @keyframes scroll {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
`;


const CashContributionPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <MainWrapper>
        <Container>
          <MarqueeWrapper>
            "Your contributions make the world a better place—thank you for your kindness and generosity!"
          </MarqueeWrapper>
          <Row>
            <Col md={6} lg={4}>
              <CardWrapper>
                <Card.Body>
                  <IconWrapper>
                    <FaHandsHelping />
                  </IconWrapper>
                  <Card.Title>Group Contributions</Card.Title>
                  <Card.Text>
                    Join hands with others to save for common goals. Perfect for communities and associations.
                  </Card.Text>
                  <ButtonWrapper href="/register">Learn more</ButtonWrapper>
                </Card.Body>
              </CardWrapper>
            </Col>
            <Col md={6} lg={4}>
              <CardWrapper>
                <Card.Body>
                  <IconWrapper>
                    <BsPiggyBank />
                  </IconWrapper>
                  <Card.Title>Personal Savings</Card.Title>
                  <Card.Text>
                    Save towards your goals effortlessly with our personal savings plans.
                  </Card.Text>
                  <ButtonWrapper href="/register">Start Saving</ButtonWrapper>
                </Card.Body>
              </CardWrapper>
            </Col>
            <Col md={6} lg={4}>
              <CardWrapper>
                <Card.Body>
                  <IconWrapper>
                    <BsCurrencyExchange />
                  </IconWrapper>
                  <Card.Title>Cash Withdrawals</Card.Title>
                  <Card.Text>
                    Seamlessly withdraw your contributions when you need them.
                  </Card.Text>
                  <ButtonWrapper href="/register">Withdraw Now</ButtonWrapper>
                </Card.Body>
              </CardWrapper>
            </Col>

            {/* New Contribution Cards */}
            <Col md={6} lg={4}>
              <CardWrapper>
                <Card.Body>
                  <IconWrapper>
                    <FaGlobe />
                  </IconWrapper>
                  <Card.Title>Societal Development</Card.Title>
                  <Card.Text>
                    Contribute to initiatives that improve infrastructure, clean the environment, and more.
                  </Card.Text>
                  <ButtonWrapper href="/register">Contribute Now</ButtonWrapper>
                </Card.Body>
              </CardWrapper>
            </Col>
            <Col md={6} lg={4}>
              <CardWrapper>
                <Card.Body>
                  <IconWrapper>
                    <FaHospital />
                  </IconWrapper>
                  <Card.Title>Hospital Support</Card.Title>
                  <Card.Text>
                    Help provide better healthcare services by donating to hospitals.
                  </Card.Text>
                  <ButtonWrapper href="/register">Donate Now</ButtonWrapper>
                </Card.Body>
              </CardWrapper>
            </Col>
            <Col md={6} lg={4}>
              <CardWrapper>
                <Card.Body>
                  <IconWrapper>
                    <FaSchool />
                  </IconWrapper>
                  <Card.Title>Education & Schools</Card.Title>
                  <Card.Text>
                    Support education by contributing to schools and student programs.
                  </Card.Text>
                  <ButtonWrapper href="/register">Support Now</ButtonWrapper>
                </Card.Body>
              </CardWrapper>
            </Col>
            <Col md={6} lg={4}>
              <CardWrapper>
                <Card.Body>
                  <IconWrapper>
                    <FaHandsHelping />
                  </IconWrapper>
                  <Card.Title>Orphanage Homes</Card.Title>
                  <Card.Text>
                    Make a difference in the lives of children in orphanage homes.
                  </Card.Text>
                  <ButtonWrapper href="/register">Help Now</ButtonWrapper>
                </Card.Body>
              </CardWrapper>
            </Col>
          </Row>
        </Container>
      </MainWrapper>
      <Footer />
    </>
  );
};

export default CashContributionPage;
