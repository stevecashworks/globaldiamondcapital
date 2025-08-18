import React from "react";
import { Navbar, Nav, NavDropdown, Container, Dropdown} from "react-bootstrap";
import "./Header.css"; // Custom CSS for styling
import styled from "styled-components";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BiLogoFacebook, BiLogoTwitter, BiLogoInstagramAlt, BiLogoDribbble } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa"; // Importing WhatsApp logo from react-icons
import getServiceList from "../serviceList.js";
import {selectIsLogged, setIsLogged, setUserDetails} from "../state/slices/userSlice.js"
import {useDispatch, useSelector} from "react-redux"
import { useNavigate } from "react-router-dom";
const logOut=(nav,dispatch)=>{
  window.localStorage.removeItem("support_token");
  dispatch(setIsLogged(false))
  
  nav("/")
  }
const HeaderTopCon = styled.div`
  height: 40px;
  width: 100vw;
  padding-left: 8px;
  padding-right: 8px;
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 10px;
  color: rgb(0, 0, 0, 0.4);
  font-size: 20px;
`;

const ContactDetailsCon = styled.span`
  height: 20px;
  align-items: center;
`;

const Highlight = styled.span`
  color: #1abc9c; /* Teal highlight */
  font-weight: bold;
`;

const WhatsAppLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #25D366; /* WhatsApp green color */
  font-size: 20px;
  margin-left: 10px;
  text-decoration: none;

  &:hover {
    color: #1abc9c; /* Highlight on hover */
  }
`;

const Header = () => {
const navigate=useNavigate()
  // const userDetails= useSelector(selectUserDetails)
  // console.log({userDetails})
  const user_is_logged_in=useSelector(selectIsLogged)
  const serviceList=getServiceList(user_is_logged_in)
  const dispatch= useDispatch()
  return (
    <div>
      <gecko-coin-price-marquee-widget
        locale="en"
        outlined="true"
        coin-ids=""
        initial-currency="usd"
      ></gecko-coin-price-marquee-widget>

      <HeaderTopCon style={{ backgroundColor: "#fff", display: "none" }}>
        <ContactDetailsCon>
          <span>
            <Highlight>
              <FaPhoneAlt />
            </Highlight>
            <span style={{ fontWeight: 600, color: "rgb(0,0,0,0.4)" }}>
              {" "}
              +00 11 22 55 6666
            </span>
          </span>
          <span style={{ marginRight: "10px", marginLeft: "10px" }}>⏐</span>
          <span>
            <Highlight>
              <MdEmail />
            </Highlight>
            <span style={{ fontWeight: 600, color: "rgb(0,0,0,0.4)" }}>
              {" "}
              info@globaldiamondcapitals
            </span>
          </span>
        </ContactDetailsCon>
        <SocialIcons>
          <BiLogoFacebook />
          <BiLogoTwitter />
          <BiLogoInstagramAlt />
          <BiLogoDribbble />
        </SocialIcons>
      </HeaderTopCon>

      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/home">GlobalDiamondCapitals</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
          
              <Nav.Link href="/home">Home</Nav.Link>
              {/* Services Dropdown */}
              <NavDropdown
                title="Services"
                id="services-dropdown"
                menuVariant="dark"
              >
                {serviceList.map((service) => {
                  if (service.subs) {
                    return (
                      <NavDropdown title="Investments">
                        {service.subs.map((sub) => {
                          return (
                            <NavDropdown.Item href={`#plans`}>
                              {sub}
                            </NavDropdown.Item>
                          );
                        })}
                        <NavDropdown.Divider />
                      </NavDropdown>
                    );
                  }
                  return (
                    <NavDropdown.Item href={service.href}>
                      {service.title}
                    </NavDropdown.Item>
                  );
                })}

                <NavDropdown.Divider />
                <NavDropdown.Item href="#more-services">
                  More Services
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#about">About Us</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
              {
                user_is_logged_in&&<Dropdown>
                <Dropdown.Toggle as={Nav.Link} id="dropdown-actions">
                  Actions
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/invest">Invest</Dropdown.Item>
                  <Dropdown.Item href="/withdraw">Withdraw</Dropdown.Item>
                  <Dropdown.Item href="/addwallet">Wallets</Dropdown.Item>
                  
                  <Dropdown.Item onClick={()=>{logOut(navigate,dispatch)}}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              }
              {/* WhatsApp Link */}
              <WhatsAppLink
                href="https://wa.link/eilpok"
                target="_blank"
                rel="noopener noreferrer"
                title="Chat with us on WhatsApp"
              >
                <FaWhatsapp />


              </WhatsAppLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
