import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Header from '../components/header'; // Adjust the import path based on your project
import Footer from '../components/footer'; // Adjust the import path based on your project
import fetchData from '../fetchData';
import { developmentApiEntryPoint } from './register';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ButtonSpinner from '../components/buttonspinner';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      alert('Please enter your email address!');
      return;
    }

    setIsSubmitting(true);

    fetchData(
      `${developmentApiEntryPoint}/users/forgotpassword`,
      (data) => {
        setIsSubmitting(false);
        setIsSuccess(true);
      },
      (message) => {
        alert(`Error: ${message}`);
        setIsSubmitting(false);
      },
      'POST',
      { email }
    );
  };

  return (
    <>
      <Header />
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <h2 className="text-center text-secondary mb-4">Forgot Password</h2>
            {isSuccess ? (
              <div className="text-center">
                <i className="bi bi-check-circle text-success" style={{ fontSize: '2rem' }}></i>
                <p className="text-success mt-3">Check your email for password reset instructions.</p>
              </div>
            ) : (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className="text-secondary">Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Button type="submit" variant="primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Reset Password'} {isSubmitting&&<ButtonSpinner/>}
                </Button>
              </Form>
            )}
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default ForgotPasswordPage;
