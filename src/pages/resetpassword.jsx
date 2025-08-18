import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Header from '../components/header'; // Adjust the import path based on your project
import Footer from '../components/footer'; // Adjust the import path based on your project
import fetchData from '../fetchData';
import { developmentApiEntryPoint } from './register';
import ButtonSpinner from '../components/buttonspinner';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id: userId } = useParams(); // Extract the `id` from the path
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userId) {
      setError('Invalid request. User ID is missing.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (password !== retypePassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    fetchData(
      `${developmentApiEntryPoint}/users/resetpassword`,
      (data) => {
        alert('Password has been reset successfully.');
        setIsSubmitting(false);
        navigate('/login');
      },
      (message) => {
        setError(`Error: ${message}`);
        setIsSubmitting(false);
      },
      'POST',
      { id: userId, password }
    );
  };

  return (
    <>
      <Header />
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <h2 className="text-center text-secondary mb-4">Reset Password</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="text-secondary">New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="text-secondary">Re-type Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Re-type new password"
                  value={retypePassword}
                  onChange={(e) => setRetypePassword(e.target.value)}
                />
              </Form.Group>
              {error && <p className="text-danger">{error}</p>}
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Reset Password'} {isSubmitting&&<ButtonSpinner/>}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default ResetPasswordPage;
