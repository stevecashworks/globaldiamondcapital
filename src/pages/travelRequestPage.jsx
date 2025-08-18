import React, { useState } from "react";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import Header from "../components/header";
import Footer from "../components/footer";
import fetchData from "../fetchData"
import { useNavigate } from "react-router-dom";
import {developmentApiEntryPoint} from "./register"
function TravelRequest() {
  const [currentLocation, setCurrentLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [reason, setReason] = useState("");
  const [placesOfInterest, setPlacesOfInterest] = useState("");
  const [travelDateTime, setTravelDateTime] = useState("");
  const [currentLocationSuggestions, setCurrentLocationSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const navigate= useNavigate()
  const fetchSuggestions = async (query, setSuggestions) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
      );
      const data = await response.json();

      const suggestions = data.map((place) => ({
        label: place.display_name,
        value: place.display_name,
      }));
      setSuggestions(suggestions);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleInputChange = (value, setField, setSuggestions) => {
    setField(value);
    fetchSuggestions(value, setSuggestions);
  };

  const handleSelectSuggestion = (suggestion, setField, setSuggestions) => {
    setField(suggestion.label);
    setSuggestions([]);
  };

  const handleQuote = () => {
    alert(`
      Travel Request Details:
      - Current Location: ${currentLocation}
      - Destination: ${destination}
      - Date & Time of Travel: ${travelDateTime || "Not selected"}
      - Reason for Traveling: ${reason || "Not selected"}
      - Places of Interest: ${placesOfInterest || "None"}
    `);
    const  reqObj={time:travelDateTime,destination,startingPoint:currentLocation, reason,placesOfInterest}
    const notFilledProperly= Object.keys(reqObj).some(x=>!reqObj[x])
    if(notFilledProperly){
      alert("All inputs are required")
      return
    }
    fetchData(
      `${developmentApiEntryPoint}/payments/createTrip`,
      (data)=>{
        alert("Successful ✔")
        navigate("/dashboard/trips")

      },
      (message)=>{
        alert(message)
        navigate("/travelrequest")
      },
      "Post",
      reqObj,
      localStorage.getItem("support_token")

    )

  };

  return (
    <>
      <Header />
      <Container className="my-4">
        <h2 className="text-center mb-4">Travel and Expense Request</h2>
        <Card className="p-4 shadow-sm">
          <Form>
            {/* Current Location */}
            <Row className="mb-3">
              <Col xs={12}>
                <Form.Group controlId="currentLocation">
                  <Form.Label>Current Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your current location"
                    value={currentLocation}
                    onChange={(e) =>
                      handleInputChange(
                        e.target.value,
                        setCurrentLocation,
                        setCurrentLocationSuggestions
                      )
                    }
                  />
                  {currentLocationSuggestions.length > 0 && (
                    <div className="autocomplete-dropdown">
                      {currentLocationSuggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="dropdown-item"
                          onClick={() =>
                            handleSelectSuggestion(
                              suggestion,
                              setCurrentLocation,
                              setCurrentLocationSuggestions
                            )
                          }
                        >
                          {suggestion.label}
                        </div>
                      ))}
                    </div>
                  )}
                </Form.Group>
              </Col>
            </Row>

            {/* Destination */}
            <Row className="mb-3">
              <Col xs={12}>
                <Form.Group controlId="destination">
                  <Form.Label>Destination</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your destination"
                    value={destination}
                    onChange={(e) =>
                      handleInputChange(
                        e.target.value,
                        setDestination,
                        setDestinationSuggestions
                      )
                    }
                  />
                  {destinationSuggestions.length > 0 && (
                    <div className="autocomplete-dropdown">
                      {destinationSuggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="dropdown-item"
                          onClick={() =>
                            handleSelectSuggestion(
                              suggestion,
                              setDestination,
                              setDestinationSuggestions
                            )
                          }
                        >
                          {suggestion.label}
                        </div>
                      ))}
                    </div>
                  )}
                </Form.Group>
              </Col>
            </Row>

            {/* Date and Time of Travel */}
            <Row className="mb-3">
              <Col xs={12}>
                <Form.Group controlId="travelDateTime">
                  <Form.Label>Date & Time of Travel</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={travelDateTime}
                    onChange={(e) => setTravelDateTime(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Reason for Traveling */}
            <Row className="mb-3">
              <Col xs={12}>
                <Form.Group controlId="reason">
                  <Form.Label>Reason for Traveling</Form.Label>
                  <Form.Select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  >
                    <option value="" disabled>
                      Select a reason
                    </option>
                    <option value="Tourism">Tourism</option>
                    <option value="Business">Business</option>
                    <option value="Family Visit">Family Visit</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            {/* Places of Interest */}
            <Row className="mb-3">
              <Col xs={12}>
                <Form.Group controlId="placesOfInterest">
                  <Form.Label>Places of Interest</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="E.g., Eiffel Tower, Grand Canyon"
                    value={placesOfInterest}
                    onChange={(e) => setPlacesOfInterest(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Get Quote Button */}
            <Button variant="primary" onClick={handleQuote} className="w-100">
              Get Quote
            </Button>
          </Form>
        </Card>

        {/* Custom Styles */}
        <style jsx>{`
          .autocomplete-dropdown {
            position: absolute;
            z-index: 1000;
            background-color: white;
            border: 1px solid #ccc;
            width: 100%;
            max-height: 150px;
            overflow-y: auto;
          }
          .dropdown-item {
            padding: 8px 12px;
            cursor: pointer;
          }
          .dropdown-item:hover {
            background-color: #f0f0f0;
          }
        `}</style>
      </Container>
      <Footer/>
    </>
  );
}

export default TravelRequest;
