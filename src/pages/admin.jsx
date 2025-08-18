// AdminPage.js
import React, { useEffect,useState} from "react";
import Footer from "../components/footer";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Row,
  Col,
  Card,
  Button,
} from "react-bootstrap";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import NavButtons from "../components/adminnavbuttons";
import { HighLight } from "./login";
import fetchData from "../fetchData";
import { developmentApiEntryPoint } from "./register";
import { useDispatch, useSelector } from "react-redux";
import { selectAppStats, setAppStats } from "../state/slices/appSlice";
import Header from "../components/header";


const AdminPage = () => {
  const dispatch= useDispatch()
  const  appStats= useSelector(selectAppStats)
  const [temporaryAppStats, setTemporaryStats]=useState({allUsers:[],allInvestments:[],allWithdrawals:[],})
  const [hasFetched,setHasFetched]= useState(false)

  
  console.log({appStats})
  useEffect(()=>{
    fetchData(
      `${developmentApiEntryPoint}/admin/getstats`,
      (data)=>{
        dispatch(setAppStats(data.result))
        console.log(data.result)
        setTemporaryStats(data.result)
        setHasFetched(true)
      },
      (message)=>{
        alert(message)
        window.location.reload()
      }
    )
  },[])
  const {allUsers,allInvestments,allWithdrawals}=temporaryAppStats
const pendingRequests=[...allInvestments.filter(x=>x.status==="pending"),...allWithdrawals.filter(x=>x.status==="pending")]
  const stats = [
    { title: "Total Users", value:hasFetched? allUsers.length:"Fetching" },
    { title: "Total Investments", value:hasFetched?allInvestments.length:"Fetching" },
    { title: "Pending Requests", value:hasFetched?pendingRequests.length:"Fetching" },
  ];

  return (
    <Container fluid className="p-0">
      {/* Top Bar */}
    <Header/>

      {/* Navbar */}
      

      {/* Content */}
      <Container className="my-5">
        <h4 className="text-center mb-4">Quick Links:</h4>
        <NavButtons />

        <Row className="cardContent mt-5">
          {stats.map((stat) => {
            return (
              <Col xl={4}>
                <Card>
                  <Card.Header className="text-center">
                    {stat.title}
                  </Card.Header>
                  <Card.Body className="bg-success text-white d-flex justify-content-between align-items-center p-4">
                    <div>
                      <h3 id="totalUsers">{stat.value}</h3>
                    </div>
                    <div>
                      <span>7%</span>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}

          {/* Repeat similar card structure for other stats */}
        </Row>
        
      </Container>
      <Footer />
    </Container>
  );
};
export default AdminPage;
