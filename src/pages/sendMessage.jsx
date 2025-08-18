import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Header from '../components/header'; // Adjust the import path based on your project
import Footer from '../components/footer'; // Adjust the import path based on your project
import {developmentApiEntryPoint} from "./register"
const EmailCheckPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const userId = searchParams.get("id");
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`${developmentApiEntryPoint}/users/singleUser/${userId}`);
        const data = await response.json();
        console.log(data)
        if (response.ok) {
          setEmail(data.result.email);
          setName(data.result.name);
        } else {
          setError('Failed to fetch user details.');
        }
      } catch (error) {
        setError('An error occurred while fetching user details.');
      }
    };

    if (userId) {
      fetchUserDetails();
    } else {
      setError('User ID is missing.');
    }
  }, [userId]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');

    if (!email || !validateEmail(email)) {
      setError('Invalid email address.');
      return;
    }

    if (!message.trim()) {
      setError('Message cannot be empty.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${developmentApiEntryPoint}/users/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token:localStorage.getItem("support_token")
        },
        body: JSON.stringify({ email, name, message }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(`Message sent successfully to ${name}!`);
      } else {
        setError('Failed to send message.');
      }
    } catch (error) {
      setError('An error occurred while sending the message.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <h2 className="text-center text-secondary mb-4">Email Check Page</h2>
            {email && name && <p>Sending a message to <strong>{name}</strong> with email: <strong>{email}</strong></p>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="text-secondary">Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Write your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Form.Group>
              {error && <p className="text-danger">{error}</p>}
              {success && <p className="text-success">{success}</p>}
              <Button type="submit" variant="primary" disabled={isSubmitting} className="w-100">
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default EmailCheckPage;
