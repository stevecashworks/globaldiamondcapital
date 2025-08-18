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

const Dashboard = () => {
  // Sample data for the chart
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Blood Pressure (mmHg)',
        data: [120, 125, 115, 130, 125, 118, 122],
        borderColor: '#1abc9c',
        backgroundColor: 'rgba(26, 188, 156, 0.2)',
        tension: 0.3,
      },
      {
        label: 'Heart Rate (bpm)',
        data: [72, 75, 70, 78, 74, 73, 76],
        borderColor: '#3498db',
        backgroundColor: 'rgba(52, 152, 219, 0.2)',
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
        text: 'Health Trends Over Time',
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
            <h1>Dashboard</h1>
            <p>
              Welcome to your dashboard. Monitor stats, manage services, and access analytics
              seamlessly.
            </p>
          </Col>
        </Row>

        {/* Dashboard Cards */}
        <Row className="g-4">
          <Col lg={4} md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Appointments</Card.Title>
                <Card.Text>Track and manage your upcoming appointments.</Card.Text>
                <Button href="#billing" variant="primary">Get started</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Health Records</Card.Title>
                <Card.Text>Access your health history and medical reports.</Card.Text>
                <Button href="#billing" variant="primary">Get health details</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Billing</Card.Title>
                <Card.Text>Manage your payments and invoices easily.</Card.Text>
                <Button href="#billing" variant="primary">Go to Billing</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Analytics Section */}
        <Row className="my-5">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Health Analytics</Card.Title>
                <Line data={chartData} options={chartOptions} />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Billing Section */}
        <Row className="my-5" id="billing">
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
                  <td>Access to appointment scheduling and basic health records</td>
                  <td>$200/month</td>
                  <td>
                    <Button href={`/dashboard/payment?source=medicalsupport&amount=200&plan=basic`} variant="primary">Subscribe</Button>
                  </td>
                </tr>
                <tr>
                  <td>Standard</td>
                  <td>Includes advanced analytics and personalized health tips</td>
                  <td>$500/month</td>
                  <td>
                    <Button href={`/dashboard/payment?source=medicalsupport&amount=500&plan=standard`} variant="primary">Subscribe</Button>
                  </td>
                </tr>
                <tr>
                  <td>Premium</td>
                  <td>All features plus 24/7 support and dedicated care manager</td>
                  <td>$1000/month</td>
                  <td>
                    <Button href={`/dashboard/payment?source=medicalsupport&amount=1000&plan=premium`} variant="primary">Subscribe</Button>
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

export default Dashboard;
