import React from 'react';
import { Container, Row, Col, Card, Button, Table } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Footer from '../components/footer';
import Header from '../components/header';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CovidDashboard = () => {
  // Sample data for the chart (COVID-19 benefits over time)
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'COVID-19 Benefit Claims',
        data: [500, 600, 800, 950, 1100, 1150, 1200],
        borderColor: '#f39c12',
        backgroundColor: 'rgba(243, 156, 18, 0.2)',
        tension: 0.3,
      },
      {
        label: 'Payout Amounts (USD)',
        data: [2000, 2500, 3000, 3500, 4000, 4500, 5000],
        borderColor: '#e74c3c',
        backgroundColor: 'rgba(231, 76, 60, 0.2)',
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'COVID-19 Benefits Over Time',
      },
    },
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', color: '#212529' }}>
      <Header/>

      <Container className="py-5">
        {/* Page Title and Introduction */}
        <Row className="mb-4">
          <Col>
            <h1>COVID-19 Benefits Dashboard</h1>
            <p>Track COVID-19 benefits, claims, and payout data over time.</p>
          </Col>
        </Row>

        {/* Dashboard Cards */}
        <Row className="g-4">
          <Col lg={4} md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Claims</Card.Title>
                <Card.Text>Manage and track COVID-19 benefit claims.</Card.Text>
                <Button variant="primary">View Claims</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Benefits Payouts</Card.Title>
                <Card.Text>Access detailed payout history and amounts.</Card.Text>
                <Button variant="primary">View Payouts</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Applications</Card.Title>
                <Card.Text>Apply for new COVID-19 benefits and track status.</Card.Text>
                <Button variant="primary">Apply Now</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Analytics Section */}
        <Row className="my-5">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>COVID-19 Benefits Analytics</Card.Title>
                <Line data={chartData} options={chartOptions} />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Billing Section */}
        <Row className="my-5">
          <Col>
            <h2>Billing Plans</h2>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Plan</th>
                  <th>Features</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Basic</td>
                  <td>Access to benefit claims and application tracking</td>
                  <td>$250/month</td>
                  <td>
                    <Button  href="/dashboard/payment?source=covid19Benefit&plan=basic&amount=250" variant="primary">Subscribe</Button>
                  </td>
                </tr>
                <tr>
                  <td>Standard</td>
                  <td>Includes claims tracking, payouts, and analytics</td>
                  <td>$500/month</td>
                  <td>
                    <Button href="/dashboard/payment?source=covid19Benefit&plan=standard&amount=500" variant="primary">Subscribe</Button>
                  </td>
                </tr>
                <tr>
                  <td>Premium</td>
                  <td>Full access to all features including 24/7 support</td>
                  <td>$1500/month</td>
                  <td>
                    <Button href="/dashboard/payment?source=covid19Benefit&plan=premium&amount=1500" variant="primary">Subscribe</Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>

      <Footer/>
    </div>
  );
};

export default CovidDashboard;
