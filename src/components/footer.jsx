import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaFacebookF,
  FaTwitter,
  FaGooglePlusG,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsappSquare
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#1c1c1c",
        color: "#ecf0f1",
        padding: "2rem 0",
      }}
    >
      <Container>
        <Row className="px-md-3">
          {/* Company Section */}
          <Col sm={6} lg={3} className="py-3">
            <h5 style={{ color: "#ecf0f1" }}>Company</h5>
            <ul className="list-unstyled">
              <li>
                <a
                  href="#"
                  className="text-decoration-none"
                  style={{ color: "#bdc3c7" }}
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-decoration-none"
                  style={{ color: "#bdc3c7" }}
                >
                  Career
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-decoration-none"
                  style={{ color: "#bdc3c7" }}
                >
                  Editorial Team
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-decoration-none"
                  style={{ color: "#bdc3c7" }}
                >
                  Protection
                </a>
              </li>
            </ul>
          </Col>

          {/* More Section */}
          <Col sm={6} lg={3} className="py-3">
            <h5 style={{ color: "#ecf0f1" }}>More</h5>
            <ul className="list-unstyled">
              <li>
                <a
                  href="#"
                  className="text-decoration-none"
                  style={{ color: "#bdc3c7" }}
                >
                  Terms & Condition
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-decoration-none"
                  style={{ color: "#bdc3c7" }}
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-decoration-none"
                  style={{ color: "#bdc3c7" }}
                >
                  Advertise
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-decoration-none"
                  style={{ color: "#bdc3c7" }}
                >
                  Become an investor
                </a>
              </li>
            </ul>
          </Col>

          {/* Partner Section */}
          <Col sm={6} lg={3} className="py-3">
            <h5 style={{ color: "#ecf0f1" }}>Our Partner</h5>
            <ul className="list-unstyled">
              <li>
                <a
                  href="#"
                  className="text-decoration-none"
                  style={{ color: "#bdc3c7" }}
                >
                  Fitness
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-decoration-none"
                  style={{ color: "#bdc3c7" }}
                >
                  Medical support
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-decoration-none"
                  style={{ color: "#bdc3c7" }}
                >
                  Live meeting
                </a>
              </li>
            </ul>
          </Col>

          {/* Contact Section */}
          <Col sm={6} lg={3} className="py-3">
            <h5 style={{ color: "#ecf0f1" }}>Contact</h5>
            <p className="mt-2" style={{ color: "#bdc3c7" }}>
              351 Willow Street Franklin, MA 02038
            </p>
            
            <a
              href="#"
              className="d-block text-decoration-none"
              style={{ color: "#bdc3c7" }}
            >
              globaldiamondcapitals@gmail.com
            </a>
          
            <div id="google_translate_element"></div>

 
          </Col>
        </Row>

        <hr style={{ borderColor: "#34495e" }} />

        <p className="text-center mb-0" style={{ color: "#bdc3c7" }}>
          Copyright &copy; 2020{" "}
          <a
            href="https://macodeid.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none"
            style={{ color: "#1abc9c" }}
          >
            Global diamond capital tech team
          </a>
          . All rights reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
