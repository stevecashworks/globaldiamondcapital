import React from "react";
import styled, { keyframes } from "styled-components";
import aetna from "../assets/sponsors/Aetna.webp";
import amazon from "../assets/sponsors/amazon.webp";
import baceline from "../assets/sponsors/Baceline.webp";
import bankOfAmerica from "../assets/sponsors/BankofAmerica.webp";
import constantContact from "../assets/sponsors/Constant Contact.webp";
import enterpreneurSource from "../assets/sponsors/entrepreneurs-source.webp";
import firstCityBank from "../assets/sponsors/firstcitybank.webp";
import frannet from "../assets/sponsors/frannet.webp";
import glenWBailey from "../assets/sponsors/glennWBaileyFoundation.webp";
import globalAtlantic from "../assets/sponsors/Global-Atlantic-Financial-Group.webp";
import harborCommercial from "../assets/sponsors/harbor-compliance.webp";
import lpl from "../assets/sponsors/lpl-financial-.webp";
import mastercard from "../assets/sponsors/mastercard.webp";
import philip from "../assets/sponsors/philipedisson.webp";
import principal from "../assets/sponsors/principalFinancial_2_1.webp";
import progressive from "../assets/sponsors/progressive-commercial-logo.webp";
import rocketLaywer from "../assets/sponsors/Rocket Lawyer.webp";
import triust from "../assets/sponsors/truist.webp";
import verizon from "../assets/sponsors/Verizon.webp";
import visa from "../assets/sponsors/Visa.webp";

const brands = [
  aetna,
  amazon,
  baceline,
  bankOfAmerica,
  constantContact,
  enterpreneurSource,
  firstCityBank,
  frannet,
  glenWBailey,
  globalAtlantic,
  harborCommercial,
  lpl,
  mastercard,
  philip,
  principal,
  progressive,
  rocketLaywer,
  triust,
  verizon,
  visa,
];

const scroll = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const Section = styled.section`
  padding: 50px 0;
  background-color: #f9f9f9;
  text-align: center;

  h1 {
    font-size: 2.5rem;
    color: #2c3e50;
    margin-bottom: 20px;
  }
`;

const MarqueeContainer = styled.div`
  overflow: hidden;
  white-space: nowrap;
  position: relative;
  width: 90vw;
  display: flex;
  margin: 0 auto;
  margin-top: 100px;
  opacity: 0.8;
`;

const BrandsWrapper = styled.div`
  display: flex;
  gap: 30px;
  animation: ${scroll} 40s linear infinite;

  &:hover {
    animation-play-state: paused;
  }
`;

const BrandLogo = styled.img`
  width: auto;
  height: 60px;
  transition: transform 0.3s ease;
  filter: drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.1));
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

const Partners = () => {
  return (
    <Section>
      <h1 style={{ opacity: 0.6 }}>Our Trusted Partners</h1>
      <MarqueeContainer>
        <BrandsWrapper>
          {brands.concat(brands).map((brand, index) => (
            <BrandLogo key={index} src={brand} alt={`Brand ${index + 1}`} />
          ))}
        </BrandsWrapper>
      </MarqueeContainer>
    </Section>
  );
};

export default Partners;
