import React, { useState } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Form,
  Button,
  Alert,
  Image,
} from "react-bootstrap";
import btc from "../assets/coin-icons/btc.png";
import doge from "../assets/coin-icons/dogecoin.svg";
import eth from "../assets/coin-icons/ethereum.png";
import usdt from "../assets/coin-icons/usdt.svg";
import ButtonSpinner from "../components/buttonspinner";
import { useSelector } from "react-redux";

import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { HighLight } from "./login";
import Footer from "../components/footer";
import { selectUserDetails } from "../state/slices/userSlice";
import fetchData from "../fetchData";
import { developmentApiEntryPoint } from "./register";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
export const coins = [
  { name: "ethereum", id: "ethereum", image: eth },
  { name: "bitcoin", id: "bitcoin", image: btc },
  { name: "dogecoin", id: "dogecoin", image: doge },
  { name: "usdt", id: "usdt", image: usdt },
];
const App = () => {
  const userDetails=useSelector(selectUserDetails)
  const navigate=useNavigate()
  console.log(userDetails)
  const logout = () => {};
  const {balance, walletIds}= userDetails
  const availableWallets=Object.keys(walletIds).filter(x=>walletIds[x]!=="none")
  console.log({availableWallets})
  const [selectedCoin, setSelectedCoin] = useState("");
  const [amount, setAmount] = useState();
  const [errors, setErrors] = useState([]);
  const [loading,setLoading]= useState(false)
  const availableCoinLogo=[]
  availableWallets.forEach(wallet=>{
    coins.forEach(coin=>{
      if(coin.id===wallet){
        availableCoinLogo.push(coin)
      }
    })
  })

  const withdraw = async () => {
    const errArray = [];
    const token= localStorage.getItem("support_token")
    if (amount > balance) {
      errArray.push("Insufficient funds");
    }
    if (!selectedCoin) {
      errArray.push("Select wallet by clicking the logo");
    }
    if(errArray.length===0){
      setLoading(true)
      fetchData(
        `${developmentApiEntryPoint}/requests/withdraw`,

      (data)=>{
        alert("withdrawal was successful");
        navigate("/")
      },
      (message)=>{
        alert("an error occured")
        navigate("/dashboard")
      },
      "POST",
      {amount, wallet:{coin:selectedCoin,walletId:userDetails.walletIds[selectedCoin]}}
    ,
    token  
    )
    }
    setErrors(errArray);
  };
  console.log({selectedCoin})
  console.log(availableCoinLogo)
  return (
    <>
      {/* Navbar Start */}
     <Header/>
      {/* Navbar End */}

      {/* Page Header Start */}
      <div className="container-fluid page-header mb-5">
        <div className="container">
          <h1 className="display-3 mb-4">Withdraw</h1>
        </div>
      </div>
      {/* Page Header End */}

      {/* Callback Start */}
      <div className="container-fluid callback my-5 pt-5">
        <div className="container pt-5">
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <div className="bg-white border rounded p-4">
                <div className="text-center">
                  <p className="border rounded text-primary fw-bold py-1 px-3">
                    Current Balance: <span id="balanceCon"> $ {balance}</span>
                  </p>
                  <p className="border rounded text-primary fw-bold py-1 px-3">
                    Current wallet: <span id="selectedCoin"></span>
                  </p>
                  <h1 className="display-5 mb-5">Withdraw</h1>
                </div>

                <div className="availableWallets text-center">
                  <p className="text-success mb-5 h4">Available wallets</p>
                  <div className="coins-con d-flex align-items-center justify-content-center gap-3 flex-wrap">
                    {availableCoinLogo.map((coin) => {
                      return (
                          <Image
                          onClick={() => {
                            setSelectedCoin(coin.id);
                          }}
                          key={coin.id}
                          id={coin.id}
                          src={coin.image}
                          width={70}
                          alt={coin.name}
                          className="coin-img"
                          style={{
                            objectFit: "cover",
                            borderRadius: "50%",
                            border:
                              coin.id === selectedCoin
                                ? "2px solid blue"
                                : "none",
                          }}
                        />
                          
                        
                      );
                    })}
                    {(availableWallets.length===0)&&<>
                          <p className="text-danger">You haven't added a wallet yet</p>
                          <Button href="/addwallet" variant="outline-info">Add wallet</Button>
                          </>}
                  </div>
                  <p id="walletId" className="text-primary h4"></p>
                </div>

                <Form>
                  <Form.Group className="mb-4">
                    <Form.Control
                      type="number"
                      placeholder="Amount"
                      onChange={(e) => {
                        setAmount(Number(e.target.value));
                      }}
                      style={{ height: "70px" }}
                    />
                  </Form.Group>
                  {errors.length > 0 && (
                    <Alert className="alert-secondary" id="errors">
                      <p>Please fix the following errors to continue:</p>
                      {errors.map((err) => (
                        <p>{err}</p>
                      ))}
                    </Alert>
                  )}
                  <Button
                    onClick={() => {
                      withdraw();
                    }}
                    id="submitBtn"
                    className="btn-primary w-100 py-3"
                    disabled={loading}
                  >
                    Withdraw {loading && <ButtonSpinner/>}
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Callback End */}

      <Footer />
    </>
  );
};

export default App;
