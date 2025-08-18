import bitcoinImg from  "../assets/coin-icons/btc.png"
import ethereumImg from  "../assets/coin-icons/ethereum.png"
import usdtImg from  "../assets/coin-icons/usdt.svg"
import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import Header from '../components/header'; // Adjust the import path based on your project
import Footer from '../components/footer'; // Adjust the import path based on your project
import fetchData from "../fetchData";
import { developmentApiEntryPoint } from "./register";
import { useNavigate } from "react-router-dom";
import ButtonSpinner from "../components/buttonspinner";

const CoinSelectionPage = () => {
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [walletAddress, setWalletAddress] = useState('');
  const [loading,setLoading]= useState(false)
    const token=localStorage.getItem("support_token")
    const navigate=useNavigate()
  const coins = [
    { id: 'bitcoin', name: 'Bitcoin', image: bitcoinImg },
    { id: 'ethereum', name: 'Ethereum', image: ethereumImg },
    { id: 'usdt', name: 'USDT', image: usdtImg },
  ];

  const handleCoinClick = (coinId) => {
    setSelectedCoin(coinId);
  };

  const handleSave = () => {
    if (!selectedCoin || !walletAddress) {
      alert('Please select a coin and enter a wallet address!');
      return;
    }
    setLoading(true)
    fetchData(
        `${developmentApiEntryPoint}/admin/editcoin`,
        (data)=>{
            alert("Successful ✔");
            navigate("/admin")
        },
        (message)=>{
            alert(message)
            window.location.reload()
        },
        "POST",
        {[selectedCoin]:walletAddress},
        token

    )
  };

  return (
    <>
      <Header />
      <Container className="my-5">
        <h2 className="text-center text-secondary mb-4">Select a Coin</h2>
        <Row className="justify-content-center">
          {coins.map((coin) => (
            <Col key={coin.id} xs={6} sm={4} md={3} className="mb-3">
              <Card
                onClick={() => handleCoinClick(coin.id)}
                className={`text-center border ${
                  selectedCoin === coin.id ? 'border-success' : 'border-secondary'
                }`}
                style={{ cursor: 'pointer', backgroundColor: selectedCoin === coin.id ? '#16a085' : '#2c3e50' }}
              >
                <Card.Img
                  variant="top"
                  src={coin.image}
                  alt={coin.name}
                  style={{ maxWidth: '80%', margin: '10px auto' }}
                />
                <Card.Body>
                  <Card.Title className="text-secondary">{coin.name}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Form className="mt-4">
          <Form.Group className="mb-3">
            <Form.Label className="text-secondary">Wallet Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter wallet address"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
            />
          </Form.Group>
          <Button disabled={loading} variant="primary" onClick={handleSave}>
            Save Changes {loading&&<ButtonSpinner/>}
          </Button>
        </Form>
      </Container>
      <Footer />
    </>
  );
};

export default CoinSelectionPage;
