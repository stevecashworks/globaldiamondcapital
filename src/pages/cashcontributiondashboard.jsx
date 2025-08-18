import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Table } from 'react-bootstrap';
import styled from 'styled-components';
import { FaPiggyBank, FaHandsHelping, FaSchool, FaHospital } from 'react-icons/fa';
import Header from '../components/header';
import fetchData from "../fetchData"
import {developmentApiEntryPoint} from "./register"
import Footer from '../components/footer';

const DashboardWrapper = styled.div`
  padding: 40px 0;
  background-color: #f5f5f5;
`;

const StatCard = styled(Card)`
  margin-bottom: 20px;
  text-align: center;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const IconWrapper = styled.div`
  font-size: 36px;
  color: #1abc9c;
  margin-bottom: 10px;
`;

const ButtonWrapper = styled(Button)`
  background-color: #1abc9c;
  border: none;
  &:hover {
    background-color: blueviolet;
  }
`;

const CashContributionDashboardPage = () => {
  const [fetchedContributions, setFetchedContributions]= useState([])

 
  const amountContributed= fetchedContributions.reduce((a,b)=>a+b.payment.amount,0)
  const schoolSupport= fetchedContributions.filter(x=>x.payment.plan==="school support").reduce((a,b)=>a+b.payment.amount,0)
  

  useEffect(()=>{
    fetchData(
      `${developmentApiEntryPoint}/payments/contributions`,
      (data)=>{
        console.log(data)
        setFetchedContributions(data.result)
      },
      (message)=>{
        alert(message)
      }
    )
  },[])
  return (
    <>
      <Header />
      <DashboardWrapper>
        <Container>
          <h2 className="mb-4">Cash Contribution Dashboard</h2>

          {/* Statistics Section */}
          <Row>
            <Col md={4}>
              <StatCard>
                <Card.Body>
                  <IconWrapper>
                    <FaPiggyBank />
                  </IconWrapper>
                  <Card.Title>Total Contributions</Card.Title>
                  <Card.Text>${1500000+amountContributed}</Card.Text>
                </Card.Body>
              </StatCard>
            </Col>
            <Col md={4}>
              <StatCard>
                <Card.Body>
                  <IconWrapper>
                    <FaHandsHelping />
                  </IconWrapper>
                  <Card.Title>Group Contributions</Card.Title>
                  <Card.Text>$750,000</Card.Text>
                </Card.Body>
              </StatCard>
            </Col>
            <Col md={4}>
              <StatCard>
                <Card.Body>
                  <IconWrapper>
                    <FaSchool />
                  </IconWrapper>
                  <Card.Title>School Support</Card.Title>
                  <Card.Text>$ {250000 +schoolSupport}</Card.Text>
                </Card.Body>
              </StatCard>
            </Col>
          </Row>

          {/* Recent Contributions Section */}
          <Row className="mt-4">
            <Col md={12}>
              <Card>
                <Card.Header>Our Recent Contributors</Card.Header>
                <Card.Body>
                <div style={{height:"400px", overflowY:"scroll",width:"100%"}}>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        
                        <th>Contributor</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fetchedContributions.map(contribution=>{
                        return(
                          <tr>

                          <td>{contribution.user.name}</td>
                          <td>$ {contribution.payment.amount}</td>
                          <td>{contribution.payment.plan}</td>
                          <td>{new Date(contribution.createdAt).toDateString()}</td>
                          </tr>
                        )
                      })}
                      <tr>
                    
                        <td>John Doe</td>
                        <td>$50,000</td>
                        <td>Hospital Support</td>
                        <td>2025-01-14</td>
                      </tr>
                      <tr>
      
                        <td>Jane Smith</td>
                        <td>$30,000</td>
                        <td>School Support</td>
                        <td>2025-01-13</td>
                      </tr>
                      <tr>
                  
                        <td>Peter Milesworth</td>
                        <td>$20,000</td>
                        <td>Orphanage</td>
                        <td>2025-01-12</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Quick Contribution Options */}
          <Row className="mt-4">
            <Col md={6} lg={3}>
              <StatCard>
                <Card.Body>
                  <IconWrapper>
                    <FaHospital />
                  </IconWrapper>
                  <Card.Title>Hospital Support</Card.Title>
                  <ButtonWrapper href="/dashboard/payment?plan=Hospital support&source=contribution">Contribute</ButtonWrapper>
                </Card.Body>
              </StatCard>
            </Col>
            <Col md={6} lg={3}>
              <StatCard>
                <Card.Body>
                  <IconWrapper>
                    <FaSchool />
                  </IconWrapper>
                  <Card.Title>School Support</Card.Title>
                  <ButtonWrapper href="/dashboard/payment?plan=school support&source=contribution">Contribute</ButtonWrapper>
                </Card.Body>
              </StatCard>
            </Col>
            <Col md={6} lg={3}>
              <StatCard>
                <Card.Body>
                  <IconWrapper>
                    <FaHandsHelping />
                  </IconWrapper>
                  <Card.Title>Orphanage</Card.Title>
                  <ButtonWrapper href="/dashboard/payment?plan=Orphanage&source=contribution">Contribute</ButtonWrapper>
                </Card.Body>
              </StatCard>
            </Col>
            <Col md={6} lg={3}>
              <StatCard>
                <Card.Body>
                  <IconWrapper>
                    <FaPiggyBank />
                  </IconWrapper>
                  <Card.Title>Community</Card.Title>
                  <ButtonWrapper href="/dashboard/payment?plan=Community Development&source=contribution">Contribute</ButtonWrapper>
                </Card.Body>
              </StatCard>
            </Col>
          </Row>
        </Container>
      </DashboardWrapper>
      <Footer />
    </>
  );
};

export default CashContributionDashboardPage;
