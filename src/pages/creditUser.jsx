import React, { useEffect, useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import fetchData from "../fetchData";
import { developmentApiEntryPoint } from "./register";
const CreditUser = () => {
  const [firstValue, setFirstValue] = useState("");
  const navigate= useNavigate()
    const [secondValue, setSecondValue] = useState(0); // Default value for second form
  const location= useLocation()
   const searchParams=   new URLSearchParams(location.search)
   const id= searchParams.get("id")
   useEffect(
    ()=>{
        fetchData(
            `${developmentApiEntryPoint}/users/singleUser/${id}`,
            (data)=>{
                setSecondValue(data.result.balance)
            },
            ()=>{

            }
        )
    },[])
   

  const handleCredit = (e) => {
    e.preventDefault();
    const canProceed= window.confirm(`Are you sure you want to credit this user with: ${firstValue}?`)
    if(!firstValue){
      alert("please input a value to proceed");
      return;
    }
    if(canProceed&&firstValue){
      fetchData(`${developmentApiEntryPoint}/users/credit/${id}`,
            (data)=>{
              alert("credited successfully")
            },
            (message)=>{
              alert(message)
              navigate("/")
            },
            "POST",
            {amount:firstValue},
            localStorage.getItem("support_token")

      )
    }
  };

  const handleEditBalance = (e) => {
    e.preventDefault();
    const canProceed= window.confirm(`Are you sure you want to change this user's balance to: ${secondValue}?`)
    if(!secondValue){
      alert("please input a value to proceed");
      return;
    }
    if(canProceed){
      fetchData(`${developmentApiEntryPoint}/users/setbalance/${id}`,
            (data)=>{
              alert("credited successfully")
              navigate(`/admin/credituser?id=${id}`)
            },
            (message)=>{
              alert(message)
              navigate("/")
            },
            "POST",
            {amount:secondValue},
            localStorage.getItem("support_token")

      )
    }
  };

  return (
    <Container className="mt-5 d-flex flex-column align-items-center">
      <h2 className="text-center mb-4 text-primary">User Balance Management</h2>
      
      <Card className="p-4 shadow-lg mb-4" style={{ width: "400px", borderRadius: "12px" }}>
        <h3 className="text-center text-success">Credit User</h3>
        <Form >
          <Form.Group>
            <Form.Label>Enter amount</Form.Label>
            <Form.Control
              type="number"
              value={firstValue}
              onChange={(e) => setFirstValue(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={(e)=>{handleCredit(e)}} className="mt-3 w-100">
            Credit user
          </Button>
        </Form>
      </Card>
      
      <Card className="p-4 shadow-lg" style={{ width: "400px", borderRadius: "12px" }}>
        <h3 className="text-center text-warning">Edit User's Balance</h3>
        <Form >
          <Form.Group>
            <Form.Label>Enter new  Balance</Form.Label>
            <Form.Control
              type="number"
              value={secondValue}
              onChange={(e) => setSecondValue(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="success" onClick={(e)=>{handleEditBalance(e)}} className="mt-3 w-100">
            Set User balance
          </Button>        </Form>
      </Card>
    </Container>
  );
};

export default CreditUser;
