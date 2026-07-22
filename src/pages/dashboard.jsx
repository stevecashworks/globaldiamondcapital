import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../components/footer";
import { MdOutlineCurrencyExchange } from "react-icons/md"
import { BiMoneyWithdraw } from "react-icons/bi";
import { CiWallet } from "react-icons/ci";
import { selectIsLogged, selectUserDetails } from "../state/slices/userSlice";
import { useSelector } from "react-redux";
import QuartzTable from "../components/quartzTable";
import btcLogoImg from "../assets/coin-icons/transparentbtclogo.png"
import MedicalOfficerTable from "../components/HTMLTable";
import ReferralBonus from "../components/referral_bonus";
import ReferralEarnings from "../components/ReferralEarnings";
import {
  Container,
  Navbar,
  Nav,
  Dropdown,
  Card,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "./styles.css";
import responsive from "../responsive";
import fetchData from "../fetchData";
import { developmentApiEntryPoint } from "./register";
import { IoIosNotificationsOutline} from "react-icons/io"
import { FaChevronDown } from "react-icons/fa";
import Header from "../components/header";
import HotDeals from "../components/hotDeals";
import {WalletCards} from "lucide-react"
import InvestmentsList from "../components/investmentList";

export const logOut=(nav)=>{
window.localStorage.removeItem("support_token");
nav("/")
}
const Avatar=styled.div`
height:40px;
width:40px;
border-radius:50%;
font-weight:bold;
align-items: center;
justify-content: center;
display: flex;
background-color:var(--gold);
`
const DashboardTopCon=styled.div`
  display:flex;
  justify-content:space-between;
  width:100vw;
  margin-top: 20px;

`
const  DashboardTopConLeft=styled.div`
display:flex;
gap:10px;
`
const Text=styled.p`
  line-height: 15px;
  font-size:15px;
  margin:0;
  padding:0;


`
const UserNameCon=styled.div`
  display:flex;
  flex-direction:column;
  gap:10px;
`
const DealLogoCon=styled.div`
color:white;
background-color:var(--gold);
width:40px;
height:40px;
display:flex;
align-items:center;
justify-content:center;
`
const ContentCon = styled.div`
  margin-top: 100px;
  ${responsive("tablet", { margint_top: "50px" })};
`;
const SectionTitle=styled.div`
  font-size:30px;
  text-align: center;
  margin: 20px auto;
  

`
const WalletAddress=styled.div`
  padding-left:20px;
  padding-right:20px;
  height: 30px;
  border-radius:15px;
  background-color:#f7f7f5;
  display:flex;
  justify-content: center;
  margin:25px auto;
  width:350px;
  align-items:center;
  color:gray;
  
`
const WalletOverview=styled.div`
  display:flex;
  flex-direction:column;
  align-items: center;
  justify-content:center;
`
const Title=styled.h4`
font-size:15px;
font-weight:500;
color:rgb(0,0,0,0.5)
`
const Balance=styled.div`
font-size: 30px;
font-weight:bold;
color:rgb(0,0,0,0.3)

`
const BtnsFlex=styled.div`
  display:flex;
  gap:20px;
  margin:20px auto;
  width:300px;
  justify-content: center;
  opacity:0.8;
`
const StyledButton=styled(Button)`
  width:300px;
  margin:20px auto;
  display:flex;
  align-items: center;
  justify-content:center;
  border-radius:20px;
  background-color: var(--gold);
  border:none;
  outline:none;
  height:50px;;
  color:white;
  text-decoration:none;
  &:hover{
    background-color: var(--gold);
    opacity:0.5
  }

`
const BtcLogo= styled.img`
height:35px;
width:35px;
object-fit: cover;
`
const cryptoJargons="1YSUY27889.........................KSLLNS897"
const Dashboard = () => {
  const navigate = useNavigate()
  const [stats,setStats]= useState({})
  console.log(stats)
  const userIsLogged= useSelector(selectIsLogged);
  const userDetails=useSelector(selectUserDetails);
  useEffect(()=>{
    const token=localStorage.getItem("support_token")
    if(!token||!userIsLogged){
      navigate("/");
    }
    else{
      fetchData(
        `${developmentApiEntryPoint}/users/getstats`,
        (data)=>{
          setStats(data.result)
        },
        (message)=>{
          console.log(message)
          alert("An error occured")
          navigate("/")
        },
        "POST",
        {},
        token

      )

  
    }
    
  },[])
  console.log(userDetails)
  return (
    <Container fluid>
      {/* Navbar Start */}
     <Header/>
      {/* <hr
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          position: "relative",
          top: "100px",
        }}
      /> */}

      <DashboardTopCon>
        <DashboardTopConLeft>
      <Avatar className=" text-light">{userDetails.name[0]}</Avatar>
      <UserNameCon className="text-dark">
        <Text>{userDetails.name}</Text>
        <Text>Welcome </Text>
      </UserNameCon>
        </DashboardTopConLeft>
        < IoIosNotificationsOutline size={28} style={{marginRight:"50px"}}/>
      </DashboardTopCon>
        <WalletAddress><BtcLogo src={btcLogoImg} alt="btc logo" />{userDetails.cryptId} <FaChevronDown/></WalletAddress>

      <WalletOverview>
      <Title>Spot Balance</Title>
      <Balance>{userDetails.balance}.00 $</Balance>
      </WalletOverview>
      <BtnsFlex>
      <Button  as={Link} to="/invest" style={{width:"130px", borderRadius:"20px", fontSize:"14px"}} variant="dark"> <MdOutlineCurrencyExchange/>  Trade</Button>
      <Button as={Link} to="/withdraw" style={{width:"130px", borderRadius:"20px", fontSize:"14px"}} variant="dark"> <BiMoneyWithdraw/>  Withdraw</Button>
      </BtnsFlex>
      <StyledButton as={Link} to="/dashboard/payment"   ><CiWallet size={30} style={{marginRight:"10px"}}/> Deposit</StyledButton>
      <ReferralBonus referralLink={userDetails.referralLink}/>
      <InvestmentsList investments= {userDetails.investments}/>
      <ReferralEarnings downLines={userDetails.downLines} referralBonus={userDetails.referralBonus} referrals={userDetails.referrals}/> 
      <SectionTitle>Live  Trends</SectionTitle>
      <HotDeals/>
     
     
    
    
      
      {/* Account Details Section */}
      {/* <Container className="cardContent">
        <ContentCon>
          <h2 className="text-center mb-4">Account Details</h2>
          <Row>
            {[
              {
                title: "Balance",
                id: "balance",
                value: userDetails.balance.toFixed(2),
                percentage: "",
              },
              {
                title: "Last Deposit",
                id: "lastDeposit",
                value: userDetails.lastDeposit||0,
                percentage: "",
              },
              {
                title: "Active Deposits",
                id: "activedeposit",
                value: userDetails.activeDeposit.length,
                percentage: "",
              },
              {
                title: "Total Earnings",
                id: "earnings",
                value: userDetails.earnings.toFixed(2),
                percentage: "",
              },
              {
                title: "Referral Bonus",
                id: "ref",
                value: userDetails.referrallBonus||0,
                percentage: "",
              },
              {
                title: "Last Withdrawal",
                id: "lastWithdrawal",
                value:userDetails.lastWithdrawal||0 ,
                percentage: "",
              },
              {
                title: "Pending Withdrawal",
                id: "pendingWithdrawal",
                value: userDetails.pendingWithdrawal||0,
                percentage: "",
              },
            ].map((card, index) => (
              <Col xl={4} key={index} className="mb-4">
                <Card className="card-default">
                  <Card.Header>
                    <h2>{card.title}</h2>
                  </Card.Header>
                  <Card.Body>
                    <div className="bg-primary d-flex justify-content-between flex-wrap p-5 text-white align-items-lg-end">
                      <div className="d-flex flex-column">
                        <span className="h3 text-white" id={card.id}>
                          {card.title==="Active Deposits"?card.value:`$${card.value}`}
                        </span>
                      </div>
                      <div>
                        <span>{card.percentage}</span>
                        <i className="mdi mdi-arrow-up-bold"></i>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </ContentCon>
      </Container> */}

      {/* Total Stats Section */}
      {/* <Container className="cardContent cardContent2">
        <h2 className="text-center mb-4">Total Stats</h2>
        <Row>
          {[
            {
              title: "Total Deposits",
              id: "totalDeposit",
              value: stats.totalDeposit||0,
              color: "bg-success",
            },
            {
              title: "Total Withdrawals",
              id: "totalWithdrawal",
              value: stats.totalWithrawal||0,
              color: "bg-success",
            },
          ].map((card, index) => (
            <Col xl={4} key={index} className="mb-4">
              <Card className="card-default">
                <Card.Header>
                  <h2 className="text-center">{card.title}</h2>
                </Card.Header>
                <Card.Body>
                  <div
                    className={`${card.color} d-flex justify-content-between flex-wrap p-5 text-white align-items-lg-end`}
                  >
                    <div className="d-flex flex-column">
                      <span className="h3 text-white" id={card.id}>
                        ${card.value}
                      </span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container> */}
       <Footer style={{ width: "100vw" }} />
    </Container>
  );
};

export default Dashboard;
