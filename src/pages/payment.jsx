import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Modal, Button, Form } from "react-bootstrap";
import styled from "styled-components";
import usdt from "../assets/coin-icons/usdt.svg";
import btc from "../assets/coin-icons/btc.png";
import eth from "../assets/coin-icons/ethereum.png";
import Footer from "../components/footer";
import Header from "../components/header";
import {developmentApiEntryPoint} from "./register"
import fetchData from "../fetchData";
import responsive from "../responsive";
import start_Upload from "../upload";
import { BsUpload } from "react-icons/bs";
import ButtonSpinner from "../components/buttonspinner"

;

// Styled components
const PageWrapper = styled.div`
  background: linear-gradient(135deg, #1abc9c, #2c3e50);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ecf0f1;
  padding: 20px;
`;

const CoinCard = styled(Card)`
  background: #34495e;
  border: ${({ selected }) => (selected ? "4px solid #fff" : "none")};
  color: #ecf0f1;
  text-align: center;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }`

const CoinImage = styled.img`
  width: 80px;
  margin-bottom: 15px;
`;

const StyledButton = styled(Button)`
  background-color: #16a085;
  border: none;
  &:hover {
    background-color: #1abc9c;
  }
`;

const StyledButton2 = styled(Button)`
display:flex;
align-items:center;
justify-content:center;
width:300px;
margin:40px auto;
`;
const A= styled.a`
text-decoration:none;
 display:block;
 color:white;
 position:relative;
left:120px;
${responsive("mobile",{left:"20px"})}
`
const ImgInpCon = styled.div`
  display: flex;
  height: 100;
  width: 200px;
  border-radius: 10px;
  background-color: rgb(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin:20px auto;
  ${responsive("tablet", {
    margin: "40px auto", 
  })};
  `

const uploadFile = async (file, path, fn, onUpload,setUploadingState) => {
  try {
    await start_Upload(file, path, onUpload,setUploadingState);
    
    fn(file);
  } catch (error) {
    console.log(error);
  }
};
const PaymentsPage = () => {
  const location = useLocation();
  
  const queryParams = new URLSearchParams(location.search);
  const amount = queryParams.get("amount");
  const id= queryParams.get("id")
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [enteredAmount, setEnteredAmount] = useState(amount);
  const [fetchedCoins,setFecthedCoins]= useState({})
  const [modalShow,setModalShow]= useState(false)
  const [img_is_uploading,set_img_is_uploading]= useState(false)
  const [means,setMeans]= useState(null)
  const  [errors, setErrors]= useState([])
  const [gov_Id, set_Gov_Id] = useState();
  const navigate=useNavigate()
  const [id_url, set_Id_Url] = useState();
  const [loading, setLoading] = useState(false);
  const serviceMapping= {
    medicalsupport:"Medical Support",
    covid19Benefit:"Covid19 grants",
    insurance:"Medical Insurance",
    contribution:"Cash donation",
    trips: "Travel and expense"
  }
  // To store user input amount
  const coins = [
    { id: "btcadd", img: btc, name: "Bitcoin", address:fetchedCoins["bitcoin"]|| "loading..." },
    { id: "usdtadd", img: usdt, name: "USDT", address: fetchedCoins["usdt"]||"loading..." },
    { id: "ethadd", img: eth, name: "Ethereum", address: fetchedCoins["ethereum"]||"loading..." },
    // { id: "dogeadd", img: doge, name: "Dogecoin", address: fetchedCoins["doge"]||"loading..." },
  ]

  // Extract URL parameters
  const min = 50
  const source = queryParams.get("source");
  const plan = queryParams.get("plan");
  const quantity=queryParams.get("quantity");
  

  // Minimum amount logic for source === 'contribution'
  const handleOpenChat = () => {
 alert("paid")
};



  const minAmount = source === "contribution" ? 50 : min;
  const token= localStorage.getItem("support_token")
  
  useEffect(()=>{
    try {
      fetchData(
        `${developmentApiEntryPoint}/users/getcoins`,
        (data)=>{
          setFecthedCoins(data.result)
        },
        (message)=>{
          alert(message)
        },
        
      )
    } catch (error) {
    alert("an error occured while trying to fetch data")
    } 
  },[])
  const handleCopy = () => {
    if (selectedCoin) {
      navigator.clipboard.writeText(selectedCoin.address);
      alert("Wallet ID copied to clipboard!");
    }
  };
  
  const handleAmountChange = (e) => {
    setEnteredAmount(e.target.value);
  };

  const submitPayment=()=>{
    const inputErrors=[]
    
    if(!id_url){
      inputErrors.push("image of proof has not been uploaded successfully")
    }
    if(!enteredAmount){
      inputErrors.push("amount not set")
    }
    if(!means){
      inputErrors.push("PLease select a means of payment to proceed")
    }
    if(!selectedCoin&& (means!=="bank")){
      alert(means)
      inputErrors.push("A coin must be selected")


    }
    if(min&&(enteredAmount<min)){
      inputErrors.push(`minimum amount for this service is $${min}`)
    }
    if(!means){
    inputErrors.push(`select means of payment`)
    }
    setErrors(inputErrors)
    if(inputErrors.length===0){

      const reqObj={
            amount:enteredAmount,
            service:source,
            plan,
            paymentMethod:means,
            proof:id_url,
            coin:selectedCoin?selectedCoin.name:"none"
          }
          if(quantity){
            reqObj["quantity"]=quantity
          }
          if(id){
            reqObj.metaData={id}
          }
  

      setLoading(true)
      fetchData(
        `${developmentApiEntryPoint}/payments/create`,
        (data)=>{
          setLoading(false)
          alert("Successful ✔")
          navigate("/")
        },
        (message)=>{
          alert(message)
            setLoading(false)
        },
        "post",
       reqObj,
        token
      )
    }

  }
  return (
    <>
      <Header />
      <PageWrapper>
        <Container>
          <h2 className="text-center">Choose a Coin to Make Payment</h2>

          {/* Display optional parameters */}
          <div className="text-center my-4">
            {amount ? (
              <p>Amount: {amount}</p>
            ) : (
              <>
                <Form.Group controlId="enteredAmount">
                  <Form.Label>Enter Amount</Form.Label>
                  <Form.Control
                    type="number"
                    value={enteredAmount}
                    onChange={handleAmountChange}
                    min={minAmount} // Ensure the min value
                    placeholder={`Enter a value ${minAmount?`(min: $${minAmount})`:""}`}
                  />
                </Form.Group>
              </>
            )}
            {minAmount && <p>Minimum Amount: ${minAmount}</p>}
            {source && <p>Service: {serviceMapping[source]}</p>}
          </div>
          <Container>
            <h3 className="text-center my-4">Select a means of payment</h3>
        
      <Form className="mx-auto d-flex">
      {['radio'].map((type) => (
        <div key={`inline-${type}`} className="mb-3">
          <Form.Check
            inline
            label="Crypto"
            name="group1"
            type={type}
            id={"crypto"}
            onChange={(e)=>{
              if(e.target.checked){
                setMeans(e.target.id)
              }
            }}
          />
          <Form.Check
            inline
            label="bank"
            name="group1"
            type={type}
            id={`bank`}
            onChange={(e)=>{
              if(e.target.checked){
                setMeans(e.target.id)
              }
            }}
          />
        
        </div>
      ))}
    </Form>
  

          </Container>

          <Row style={{ width: "100%", justifyContent: "center" }}>
  {coins.map((coin) => (
    <Col key={coin.id} md={6} lg={3} className="mb-4">
      <CoinCard
        onClick={() => {setSelectedCoin(coin); setModalShow(true)}}
        selected={selectedCoin?.id === coin.id} // Check if the coin is selected
      >
        <Card.Body>
          <CoinImage src={coin.img} alt={coin.name} />
          <Card.Title>{coin.name}</Card.Title>
        </Card.Body>
      </CoinCard>
    </Col>
  ))}
</Row>
<A  onClick={handleOpenChat} target="_blank" href="https://wa.link/kl8u3f">Can't use crypto? get bank details</A>
<ImgInpCon
                    style={{ backgroundColor: "rgb(132,132,132,0.7)" }}
                  >
                    <label
                      className="ImgLabel"
                      style={{ backgroundColor: "white" }}
                      htmlFor="gov_Id"
                    >
                      {!gov_Id && <BsUpload color="gray" />}
                      {gov_Id && (
                        <img
                          className="userImg"
                          src={URL.createObjectURL(gov_Id)}
                        />
                      )}
                    </label>
                      {img_is_uploading&&<ButtonSpinner/>}
                    <label style={{ color: "black", textAlign: "center" }}>
                      Screenshot proof of payment
                    </label>
                    <input
                      onChange={(e) => {
                        uploadFile(
                          e.target.files[0],
                          "users",
                          set_Gov_Id,
                          set_Id_Url,
                          set_img_is_uploading
                        
                        );
                      }}
                      className="detailInp"
                      style={{ display: "none" }}
                      type="file"
                      id="gov_Id"
                    />
                  </ImgInpCon>

          <StyledButton2  onClick={submitPayment} variant="primary">Checkout {loading&&<ButtonSpinner/>}</StyledButton2>

          {/* Modal for Selected Coin */}
          <Modal show={modalShow} onHide={() => setModalShow(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>{selectedCoin?.name} Wallet</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
              <p>{selectedCoin?.address}</p>
              <StyledButton onClick={handleCopy}>Copy Wallet ID</StyledButton>
            </Modal.Body>
          </Modal>
            {/*modal for errors  */}
          <Modal show={errors.length>0} onHide={() =>setErrors([])} centered>
            <Modal.Header closeButton>
              <Modal.Title>Fix the following errors to proceed</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
              {errors.map(err=>{
                return <p className="text-danger">{err}</p>
              })}
              <StyledButton onClick={()=>{setErrors([])}} >Ok </StyledButton>
            </Modal.Body>
          </Modal>
        </Container>
        
      </PageWrapper>
 
      <Footer />
    </>
  );
};

export default PaymentsPage;
