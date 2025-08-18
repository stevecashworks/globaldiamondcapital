import React, { useState } from "react";
import { coins } from "./withdraw";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  Button,
  Row,
  Col,
  Card,
  Alert,
} from "react-bootstrap";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Footer from "../components/footer";
import { HighLight } from "./login";
import fetchData from "../fetchData";
import { developmentApiEntryPoint } from "./register";
import { useNavigate } from "react-router-dom";
import ButtonSpinner from "../components/buttonspinner";
import Header from "../components/header";
const AddWallet = () => {
  const navigate=useNavigate()
  const  token= localStorage.getItem("support_token")
  const [selectedCoin, setSelectedCoin] = useState({});
  const [errors, setErrors] = useState([]);
  const [loading,setLoading]= useState(false)
  const [walletId, setWalletId] = useState("");
  const addWallet = () => {
    const errorList = [];
    if (!selectedCoin.id) {
      errorList.push(["Please select a coin by clicking itsd icon"]);
    }
    if (!walletId) {
      errorList.push("You're required to provide a wallet Id");
    }
    setErrors(errorList);
    if(errorList.length<1){
      setLoading(true)
      fetchData(
        `${developmentApiEntryPoint}/users/addwallet`,
        (data)=>{
          alert("Wallet was added successfully")
          navigate("/")
        },(message)=>{
          alert("An error occured");
          navigate("/dashboard")
        },
        "POST",
        {coin:selectedCoin.id, id:walletId},
        token
      )

    }
  };
  return (
    <Container fluid className="p-0">
      {/* Navbar */}
     <Header/>

      {/* Page Header */}
      <div className="page-header text-center my-5">
        <h4 className="display-5">Add Wallet</h4>
      </div>

      {/* Main Content */}
      <Container className="callback py-5">
        <Row className="justify-content-center">
          <Col lg={7}>
            <Card className="border rounded p-4">
              <Card.Body>
                <div className="text-center">
                  <p className="d-inline-block border rounded text-primary fw-bold py-1 px-3">
                    Current Coin:{" "}
                    <span id="selectedCoin">{selectedCoin.name || "none"}</span>
                  </p>
                  <h1 className="display-5 mb-5">Add Wallet</h1>
                </div>
                <Row className="g-3">
                  <Col
                    xs={12}
                    className="d-flex flex-wrap justify-content-center gap-3"
                  >
                    {coins.map((coin) => {
                      const isSelected = coin.id === selectedCoin.id;
                      return (
                        <img
                          onClick={() => {
                            setSelectedCoin(coin);
                          }}
                          src={coin.image}
                          alt={coin.name}
                          className="coin-img"
                          width={70}
                          key={coin.id}
                          style={{
                            objectFit: "cover",
                            borderRadius: "50%",
                            border: isSelected ? "2px solid blue" : "none",
                          }}
                        />
                      );
                    })}
                  </Col>
                  <Col xs={12} className="mt-4">
                    <Form.Group>
                      <Form.Control
                        id="idInput"
                        type="text"
                        placeholder="Wallet ID"
                        style={{ height: "70px" }}
                        onChange={(e) => {
                          setWalletId(e.target.value);
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} className="text-center">
                    {errors.length > 0 && (
                      <Alert className="alert-secondary">
                        <p>Please fix the following errors to proceed:</p>
                        {errors.map((err) => (
                          <p className="text-danger">{err}</p>
                        ))}
                      </Alert>
                    )}
                    <Button
                      id="submitBtn"
                      variant="primary"
                      type="submit"
                      className="w-100 py-3"
                      disabled={loading}
                      onClick={() => {
                        addWallet();
                      }}
                    >
                      Add {loading&&<ButtonSpinner/>}
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </Container>
  );
};

export default AddWallet;
