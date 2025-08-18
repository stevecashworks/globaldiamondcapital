import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Table, Alert } from 'react-bootstrap';
import Footer from '../components/footer';
import Header from '../components/header';
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';
import fetchData from "../fetchData"
import  {developmentApiEntryPoint} from "./register"
const PlanRow=({plan,index}) => {
  const [quantity, setQuantity]=useState(1)

  return(
  <tr key={index}>
    <td>{plan.name}</td>
    <td>{plan.features}</td>
    <td>${plan.price}/month</td>
    <td >
      <div style={{display:"flex", justifyContent:"center", alignItems:"center", gap:"15px"}}>
      <Button variant='success' onClick={()=>{
        setQuantity(quantity>1?quantity-1:quantity)
      }}>

      <FaChevronCircleLeft />
      </Button>
      <p>{quantity}</p>
      <Button variant='success' onClick={()=>{setQuantity(quantity+1)}}>

      <FaChevronCircleRight/>
      </Button>
      </div>
    </td>
    <td>
      <Button href={`/dashboard/payment?plan=${plan.name}&quantity=${quantity}&source=insurance&amount=${plan.price*quantity}`}   variant="primary">Subscribe</Button>
    </td>
  </tr>
)}
const HealthInsuranceDashboard = () => {
  // Sample user insurance plans
  const [insurancePlans,setInsurancePlans]= useState([])
  useEffect(()=>{
    fetchData(
      `${developmentApiEntryPoint}/payments/getmyinsurance`,
      (data)=>{
        console.log(data)
        setInsurancePlans(data.result)
      },
      (message)=>{
        alert(message)
      },
      "POST",
      {},
      localStorage.getItem("support_token")
  
    )
  },[])
  const activePlans = [
    {
      id: 1,
      type: 'Basic Health Plan',
      startDate: '2023-01-01',
      renewalDate: '2024-01-01',
    },
    {
      id: 2,
      type: 'Premium Family Plan',
      startDate: '2023-06-15',
      renewalDate: '2024-06-15',
    },
  ];

  // Billing plans
  const billingPlans = [
    { name: 'Individual Plan', features: 'Covers one person', price: 500 },
    { name: 'Family Plan', features: 'Covers up to 5 persons', price: 1500 },
    { name: 'Corporate Plan', features: 'covers up to 12 persons', price: 3000 },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', color: '#212529' }}>
    <Header/>

      <Container className="py-5">
        {/* Page Title */}
        <Row className="mb-4">
          <Col>
            <h1>Health Insurance Dashboard</h1>
            <p>Manage your health insurance plans and subscriptions with ease.</p>
          </Col>
        </Row>

        {/* Active Insurance Section */}
        <Row className="my-4">
          <Col>
            <h2>Active Insurance Plans</h2>
            {insurancePlans.length > 0 ? (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Plan Type</th>
                    <th>Start Date</th>
                    <th>Renewal Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {insurancePlans.map((plan) => {
                    const date= new Date(plan.createdAt)
                    const noOfMonths=plan.payment.quantity||1
                  
                    date.setMonth(date.getMonth()+noOfMonths)
                    return(
                    <tr key={plan._id}>
                      <td>{plan.payment.plan}</td>
                      <td>{new Date(plan.createdAt).toDateString()}</td>
                      <td>{date.toDateString()}</td>
                      <td>
                        <Button variant="secondary">renew</Button>
                      </td>
                    </tr>
                  )})}
                </tbody>
              </Table>
            ) : (
              <Alert variant="warning">You currently have no active insurance plans.</Alert>
            )}
          </Col>
        </Row>

        {/* Dashboard Cards */}
        <Row className="g-4">
          <Col lg={4} md={6}>
            <Card>
              <Card.Body>
                <Card.Title>New Insurance</Card.Title>
                <Card.Text>Apply for a new health insurance plan today.</Card.Text>
                <Button variant="primary">Get Started</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Renew Plan</Card.Title>
                <Card.Text>Renew your existing health insurance plan quickly.</Card.Text>
                <Button variant="primary">Renew Now</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Claim Benefits</Card.Title>
                <Card.Text>Submit a claim for your health insurance benefits.</Card.Text>
                <Button variant="primary">Claim Now</Button>
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
                  <th>No of months</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {billingPlans.map((plan, index)=><PlanRow plan={plan} index={index} />)}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>

      <Footer/>
    </div>
  );
};

export default HealthInsuranceDashboard;
