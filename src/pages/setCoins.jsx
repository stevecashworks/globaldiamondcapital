import bitcoinImg from  "../assets/coin-icons/btc.png"
import ethereumImg from  "../assets/coin-icons/ethereum.png"
import usdtImg from  "../assets/coin-icons/usdt.svg"
import dogecoinImg from "../assets/coin-icons/dogecoin.svg";
import React, { useEffect, useState } from 'react';
import { Alert, Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import Header from '../components/header'; // Adjust the import path based on your project
import Footer from '../components/footer'; // Adjust the import path based on your project
import fetchData from "../fetchData";
import { developmentApiEntryPoint } from "./register";
import ButtonSpinner from "../components/buttonspinner";

const CoinSelectionPage = () => {
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [walletAddress, setWalletAddress] = useState('');
  const [walletAddresses, setWalletAddresses] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("support_token");
  const coins = [
    { id: 'bitcoin', name: 'Bitcoin', image: bitcoinImg },
    { id: 'ethereum', name: 'Ethereum', image: ethereumImg },
    { id: 'usdt', name: 'USDT', image: usdtImg },
    { id: 'doge', name: 'Dogecoin', image: dogecoinImg },
  ];

  useEffect(() => {
    fetchData(
      `${developmentApiEntryPoint}/users/getcoins`,
      (data) => {
        setWalletAddresses(data.result || {});
        setLoading(false);
      },
      (message) => {
        setError(message);
        setLoading(false);
      },
      "GET",
      undefined,
      token
    );
  }, [token]);

  const handleCoinClick = (coinId) => {
    setSelectedCoin(coinId);
    const address = walletAddresses[coinId];
    setWalletAddress(address && address !== "unset" ? address : "");
  };

  const handleSave = () => {
    const address = walletAddress.trim();
    if (!selectedCoin || !address) {
      alert('Please select a coin and enter a wallet address!');
      return;
    }
    setSaving(true);
    setError("");
    fetchData(
        `${developmentApiEntryPoint}/admin/editcoin`,
        (data)=>{
            setWalletAddresses(data.result || { ...walletAddresses, [selectedCoin]: address });
            setWalletAddress(data.result?.[selectedCoin] || address);
            setSaving(false);
            alert("Wallet address updated successfully.");
        },
        (message)=>{
            setError(message);
            setSaving(false);
        },
        "POST",
        {[selectedCoin]:address},
        token

    )
  };

  return (
    <>
      <Header />
      <Container className="my-5">
        <h2 className="text-center text-secondary mb-4">Manage Deposit Wallet Addresses</h2>
        {error && <Alert variant="danger" dismissible onClose={() => setError("")}>{error}</Alert>}
        {loading && <p className="text-center">Loading saved wallet addresses...</p>}
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
                  <Card.Text className="text-secondary small text-break">
                    {loading
                      ? "Loading address..."
                      : walletAddresses[coin.id] && walletAddresses[coin.id] !== "unset"
                        ? walletAddresses[coin.id]
                        : "No address configured"}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Form className="mt-4" onSubmit={(event) => { event.preventDefault(); handleSave(); }}>
          <Form.Group className="mb-3">
            <Form.Label className="text-secondary">Wallet Address</Form.Label>
            <Form.Control
              type="text"
              placeholder={selectedCoin ? `Enter ${coins.find((coin) => coin.id === selectedCoin)?.name} address` : "Select a coin first"}
              value={walletAddress}
              disabled={!selectedCoin || loading}
              onChange={(e) => setWalletAddress(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" disabled={loading || saving || !selectedCoin} variant="primary">
            Save Changes {saving && <ButtonSpinner />}
          </Button>
        </Form>
      </Container>
      <Footer />
    </>
  );
};

export default CoinSelectionPage;
