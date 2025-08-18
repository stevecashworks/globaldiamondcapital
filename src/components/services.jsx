import React from "react";
import styled, { keyframes } from "styled-components";
import { Row, Col } from "react-bootstrap";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShieldIcon from "@mui/icons-material/Shield";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import "./services.css";
// Animation for fade-in effect
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const CardService = styled.div`
  text-align: center;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${fadeInUp} 0.8s ease forwards;
`;

const CircleShape = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-bottom: 15px;
  color: #fff;
  font-size: 24px;
`;

const CardText = styled.p`
  margin: 0;
  font-size: 18px;

  span {
    font-weight: bold;
  }
`;

const Services = () => {
  return (
    <Row className="justify-content-center fadeinUp" id="services">
      <Col md={4} className="py-3">
        <CardService>
          <CircleShape className="bg-secondary">
            <ChatBubbleOutlineIcon />
          </CircleShape>
          <CardText>
            <span>Chat</span> with an expert
          </CardText>
        </CardService>
      </Col>
      <Col md={4} className="py-3">
        <CardService>
          <CircleShape className="bg-primary">
            <ShieldIcon />
          </CircleShape>
          <CardText>
            <span>One</span> Asset protection
          </CardText>
        </CardService>
      </Col>
      <Col md={4} className="py-3">
        <CardService>
          <CircleShape className="bg-success">
            <ShoppingBasketIcon />
          </CircleShape>
          <CardText>
            <span>Secure</span> Investments
          </CardText>
        </CardService>
      </Col>
    </Row>
  );
};

export default Services;
