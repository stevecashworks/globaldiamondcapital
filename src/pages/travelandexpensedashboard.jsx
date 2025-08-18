import React, { useEffect, useState } from 'react';
import { Container, Row,Alert , Col, Card, Table, Button, ProgressBar } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Header from '../components/header';
import Footer from '../components/footer';
import fetchData from '../fetchData';
import { developmentApiEntryPoint } from './register';
import { useNavigate } from 'react-router-dom';

// Register components needed for Bar chart
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const TravelExpenseDashboard = () => {
  // Sample scheduled travel data
  const [myTrips, setMyTrips]= useState([])
  const navigate=useNavigate()
  useEffect(()=>{
    fetchData(
      `${developmentApiEntryPoint}/payments/mytrips`,
      (data)=>{
        setMyTrips(data.result)
      },
      (message)=>{
        alert(message)
        navigate("/dashboard/trips")
      },
      "Post",
      {},
      localStorage.getItem("support_token")

    )
  },[])
  const travelPlans = [
    {
      id: 1,
      destination: 'Paris, France',
      startDate: '2025-02-10',
      endDate: '2025-02-20',
      status: 'Confirmed',
    },
    {
      id: 2,
      destination: 'Tokyo, Japan',
      startDate: '2025-03-15',
      endDate: '2025-03-22',
      status: 'Pending',
    },
  ];

  // Sample expenses data
  const expenses = [
    { category: 'Transportation', amount: 500 },
    { category: 'Lodging', amount: 700 },
    { category: 'Food', amount: 300 },
    { category: 'Miscellaneous', amount: 200 },
  ];

  const totalExpense = expenses.reduce((acc, expense) => acc + expense.amount, 0);

  // Chart data
  const chartData = {
    labels: expenses.map((expense) => expense.category),
    datasets: [
      {
        label: 'Expenses',
        data: expenses.map((expense) => expense.amount),
        backgroundColor: ['#1abc9c', '#3498db', '#e74c3c', '#9b59b6'],
        borderColor: '#2c3e50',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  // Billing plans
  const billingPlans = [
    { name: 'Basic Plan', features: 'Track up to 3 trips', price: '$5/month' },
    { name: 'Standard Plan', features: 'Track unlimited trips', price: '$15/month' },
    { name: 'Premium Plan', features: 'Custom reports and analysis', price: '$25/month' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', color: '#212529' }}>
      <Header/>

      <Container className="py-5">
        {/* Page Title */}
        <Row className="mb-4">
          <Col>
            <h1>Travel & Expense Planning Dashboard</h1>
            <p>Organize your trips and track expenses efficiently.</p>
          </Col>
        </Row>

        {/* Scheduled Travel Section */}
        <Row className="my-4">
          <Col>
            <h2>Scheduled Travel Plans</h2>
            {myTrips.length > 0 ? (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Start Point</th>
                    <th>Destination</th>
                    <th>Scheduled Date</th>
                    <th>Estimated cost</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {myTrips.map((plan) => (
                    <tr key={plan._id}>
                      <td>{plan.startingPoint}</td>
                      <td>{plan.destination}</td>
                      <td>{new Date(plan.time).toDateString()}</td>
                      <td>{plan.cost===0?"pending":`$${plan.cost}`}</td>
                      <td>{plan.paymentStatus}</td>
                      <td>
                        {plan.paymentStatus==="pending"&&<Button variant="success" href={`/dashboard/payment?amount=${plan.cost}&source=trips&id=${plan._id}`} className="me-2">
                          Pay Now
                        </Button>}
                        {plan.paymentStatus==="confirmed"&&<p>paid</p>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <Alert variant="info">No upcoming travel plans.</Alert>
            )}
          </Col>
        </Row>

        {/* Expense Summary */}
        {/* <Row className="my-4">
          <Col lg={8}>
            <Card>
              <Card.Body>
                <h2>Expense Summary</h2>
                <div style={{ height: '300px' }}>
                  <Bar data={chartData} options={chartOptions} />
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4}>
            <Card>
              <Card.Body>
                <h3>Total Expenses</h3>
                <h4>${totalExpense}</h4>
                <ProgressBar now={(totalExpense / 2000) * 100} label={`${((totalExpense / 2000) * 100).toFixed(0)}%`} />
                <p className="mt-3">Max budget: $2000</p>
              </Card.Body>
            </Card>
          </Col>
        </Row> */}

        {/* Detailed Expenses */}
        <Row className="my-4">
          <Col>
            <h2>Sample Plan</h2>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense, index) => (
                  <tr key={index}>
                    <td>{expense.category}</td>
                    <td>${expense.amount}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Button variant="primary" href="/travelrequest" className="w-100" block>
          Schedule a trip
        
      </Button>
    
      </Container>

      <Footer/>
    </div>
  );
};

export default TravelExpenseDashboard;
