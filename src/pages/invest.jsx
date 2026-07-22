import React, { useEffect, useState } from "react";
import {toast} from "react-hot-toast"
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Button,
  Row,
  Col,
  Card,
  Form,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { selectIsLogged, selectUserDetails } from "../state/slices/userSlice";
import { useSelector } from "react-redux";
import "./styles.css";
import styled from "styled-components";
import usdt from "../assets/coin-icons/usdt.svg";
import btc from "../assets/coin-icons/btc.png";
import eth from "../assets/coin-icons/ethereum.png";
import doge from "../assets/coin-icons/dogecoin.svg";
import Footer from "../components/footer";
import { HighLight } from "./login";
import fetchData from "../fetchData";
import ErrorModal from "../components/errorsModal";
import { developmentApiEntryPoint } from "./register";
import { useNavigate } from "react-router-dom";
import ButtonSpinner from "../components/buttonspinner";
import Header from "../components/header";
const coins = [usdt, eth, btc, doge];
const CoinsCon = styled.div`
  width: 80vw;
  margin: 20px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;
const CoinImg = styled.div`
  border: ${(props) => (props.active ? "1px solid blue" : "none")};
  width: 70px;
  object-fit: cover;
  border-radius: 50%;
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const Input = styled.input`
  width: 300px;
  height: 35px;
  display: block;
  margin: 20px auto;
`;
const ResponsiveContainer= styled(Container)`
width:90vw;
margin:20px auto;
`
const  Label=styled.label`
  margin-bottom:10px;
  cursor:pointer;
`;
const PlansAndCoins = () => {
  const token=localStorage.getItem("support_token")
  const navigate= useNavigate()
  const  userDetails= useSelector(selectUserDetails)
  console.log(userDetails)
  const [currentPlan, setCurrentPlan] = useState({});
  const [fetchedCoins,setFetchedCoins]= useState({})
  const [wallet, setWallet]= useState("spot_balance");
  const [amount, setAmount]= useState("")
  const [currentCoin, setCurrentCoin] = useState( {
      id: "USDTadd",
      img: usdt,
      name: "usdt",
      address: fetchedCoins.usdt?fetchedCoins.usdt:"loading ...",
    });
    useEffect(()=>{
      setCurrentCoin({...currentCoin,address:fetchedCoins.usdt})
    },[fetchedCoins])
  const [inputErrors, setInputErrors]= useState([])
  const [loading,setLoading]= useState(false)
  const plansMatch = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const [explanation, setExplanation] = useState("");
  const [invalidAmount, setInvalidamount] = useState(false);
  const [currentAmount, setCurrentAmount]=useState(0)
  const [placeHolder, setPlaceHolder]= useState("")
  
const balanceMap={
  earnings:userDetails.totalEarnings,
  referral_bonus:userDetails.referralBonus,
  balance:userDetails.balance
}
const currentBalance= balanceMap[wallet]
  console.log(fetchedCoins)
  useEffect(()=>{
    if(!token){
      navigate("/")
    }else{
      fetchData(
        `${developmentApiEntryPoint}/users/getcoins`,
        (data)=>{
          console.log(data)

          setFetchedCoins(data.result)
          
        },(message)=>{
          alert(message)
          navigate("/")
        }
      )
    }
  },[])
  const invest=()=>{
    console.log(currentPlan)
    const insufficentFunds= amount>currentBalance
    try{
      const errors=[]
      if(insufficentFunds){
        errors.push("insufficentFunds");
      }
    if(!currentCoin){
      errors.push('Please select a coin copy the address by clicking the "Copy Wallet ID" button,  make payment to the address and click Invest')
    }
    if(!currentPlan.min){
      errors.push("Please select a plan  to continue")
      

    }
    
    if(invalidAmount){
      errors.push(explanation==="none"?"Invalid Amount":`Amount Selected is too ${explanation} for the selected plan`)
    }
    // if(!amount){
    //   errors.push("Please input an amount to continue")
    // }
    console.log({errors})
    setInputErrors(errors)
    if(errors.length===0){
      setLoading(true)
      fetchData(
        `${developmentApiEntryPoint}/requests/invest`,
        (data)=>{
          alert("Request sent successfully")
          navigate("/")
        },
        (message)=>{
          alert("an error occured while trying to process request")
          navigate("/invest")
        },
        "POST",
        {plan:currentPlan.id, coin:currentCoin.name, amount,status:"active", wallet},
        token

      )
    }
    }
    catch(err){
      console.log(err.message)
    }
    
  }

  

  const plans=[
    {
    id: "starter",
    title:"Starter Plan",
    roi: 10,
    min: 20 ,
    max: 999,
    duration: 24,
    reinvestment: "Reinvestment Supported",
  },
  {
    id: "premium",
    title:"Premium plan",
    roi: 25,
    min: 1000,
    max: 9999,
    duration: 48,
    reinvestment: "Reinvestment Supported",
  },
  {
    id: "ultimate",
    title:"Ultimate Plan",
    roi: 40,
    min: 40000,
    max: 99999,
    duration: 168,
    reinvestment: "Reinvestment Supported",
  },
  {
    id: "standard",
    title:"Standard Plan",
    roi: 25,
    min: 500,
    max: 999 ,
    duration: 48 ,
    reinvestment: "Reinvestment Supported",
  },
  // {
  //   title: "Annual Plan",
  //   roi: 15 ,
  //   min: "5000 USD",
  //   max: "9999 USD",
  //   duration: "1 Year Plan",
  //   reinvestment: "Reinvestment Supported",
  // },
  {
    id: "corporate",
    title:"Corporate Plan",
    roi: 50,
    min: 100000,
    max:9999999999,
    duration: 720,
    reinvestment: "Reinvestment Supported",
  },
  ]

  const coins=[
    // {
    //   id: "btcadd",
    //   img: btc,
    //   name: "bitcoin",
    //   address: fetchedCoins.bitcoin?fetchedCoins.bitcoin:"loading ...",
    // },
    {
      id: "USDTadd",
      img: usdt,
      name: "usdt",
      address: fetchedCoins.usdt?fetchedCoins.usdt:"loading ...",
    },
    // {
    //   id: "ethereumadd",
    //   img: eth,
    //   name: "ethereum",
    //   address: fetchedCoins.ethereum?fetchedCoins.ethereum:"loading ...",
    // },
  ]

  return (
    <div>
      {/* Navbar Start */}
      <Header/>
      <ErrorModal errors={inputErrors}/>
      {/* Navbar End */}

      {/* Plans Start */}
      <Container className="text-center  my-5" style={{ marginTop: "60px" }}>
        <h1 className="mb-5">Select Plan</h1>
        <Row className="gy-4">
          {plans.map((plan) => (
            <Col
              onClick={() => {
                setCurrentPlan(plan);
                setPlaceHolder(`Min:   ${plan.min}  -  Max    ${plan.max}`)
              }}
              key={plan.id}
              md={4}
            >
              <Card
                className="h-100"
                style={{
                  border: plansMatch(plan, currentPlan)
                    ? "3px solid green"
                    : "1px solid rgb(0,0,0,0.1)",
                }}
              >
                <Card.Body>
                  <Card.Title className="text-white bg-dark py-2">
                    {plan.title}
                  </Card.Title>
                  <Card.Text className="mb-2">{plan.roi}% ROI</Card.Text>
                  <Card.Text className="mb-2">
                    Min Deposit: {plan.min} USD
                  </Card.Text>
                  <Card.Text className="mb-2">
                    Max Deposit: {plan.max} USD
                  </Card.Text>
                  <Card.Text className="mb-2">
                    {plan.duration} hrs plan
                  </Card.Text>
                  <Card.Text className="mb-2">{plan.reinvestment}</Card.Text>
                  <Button variant="primary">Invest Now</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      {/* Plans End */}
      {/* <CoinsCon>
        {coins.map((coin) => {
          return <CoinImg src={coin} />;
        })}
      </CoinsCon> */}
      {/* Coins Select Start
      <Container className="text-center my-5">
        <h1>Select Coin</h1>
        <Row className="gy-4 justify-content-center">
          {coins.map((coin) => (
            <Col
              onClick={() => {
                setCurrentCoin(coin);
              }}
              key={coin.id}
              md={4}
              className="text-center"
            >
              <img
                width={100}
                src={coin.img}
                alt={coin.name}
                className="selected-coin-img"
                style={{
                  border: plansMatch(coin, currentCoin)
                    ? "2px solid blue"
                    : "none",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            </Col>
          ))}
        </Row>
        <Row className="my-5">
          <h4>
            {currentCoin.name} Wallet Address:{" "}
            <br/>
            <span>{currentCoin.address}</span>
          </h4>
          <Button
            variant="primary"
            style={{ width: "200px", margin: "20px auto" }}
            onClick={() => {
              navigator.clipboard.writeText(currentCoin.address);
              toast.success(" Address Copied Successfully! ")
            }}
          >
            Copy Wallet ID
          </Button>
        </Row>
        <InputContainer>
          <h2>Amount</h2>
          <Input
            type="number"
            placeholder="input amount to invest"
            onChange={(e) => {
              const inputAmount = e.target.value;
               setCurrentAmount(e.target.value)
              setInvalidamount(
                !currentPlan.min ||
                  inputAmount < currentPlan.min ||
                  inputAmount > currentPlan.max
              );
              setExplanation(
                !currentPlan.min
                  ? "none"
                  : inputAmount > currentPlan.max
                  ? "high"
                  : "low"
              );
            }}
          />
          {invalidAmount && (
            <p className="text-danger" style={{ fontWeight: "bold" }}>
              {explanation === "none"
                ? "Please select a plan to continue"
                : `Amount is too ${explanation} for selected plan`}
            </p>
          )}
          <Button
            style={{ width: "250px", margin: "20px auto", display: "block" }}
            disabled={invalidAmount||loading}
            variant="primary"
            onClick={invest}

          >
            Invest {loading&&<ButtonSpinner/>}
          </Button>
        </InputContainer>
      </Container> */}
      <ResponsiveContainer className="mb-5">
          <Label htmlFor="deduct_from">Deduct From:</Label>
        <Form.Select id="deduct_from" onChange={(e)=>{setWallet(e.target.value)}}  className="mb-4">
          <option value="spot_balance">Spot (Balance:  ${userDetails.balance})</option>
          <option value="earnings">Earnings (Balance:  ${userDetails.totalEarnings})</option>
          <option value="referral_bonus">Referral bonus (Balance:  ${userDetails.referralBonus})</option>
        </Form.Select>
        <Label>Amount to Trade (available {currentBalance})</Label>
        <Form.Control placeholder={placeHolder} onChange={(e)=>{
          setAmount(e.target.value)
          const inputAmount= e.target.value
          setInvalidamount(
                !currentPlan.min ||
                  inputAmount < currentPlan.min ||
                  inputAmount > currentPlan.max||
                  inputAmount>currentBalance
              );
              setExplanation(
                !currentPlan.min
                  ? "none"
                  : inputAmount > currentPlan.max
                  ? "high"
                  : "low"
              );
          }}  type="number"/>
        {(invalidAmount)&&<p className="text-danger mt-2" style={{fontSize:"13px"}}>Invalid amount</p>}
        <Button onClick={invest} className="w-80 mt-4" variant="success">Start Trade</Button>
      </ResponsiveContainer>
      {/* Coins Select End */}
      <Footer />
    </div>
  );
};

export default PlansAndCoins;
