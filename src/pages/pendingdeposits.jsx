import React from "react";
import { Navbar, Nav, NavDropdown, Button, Table, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { HighLight } from "./login";
import Footer from "../components/footer";
import NavButtons from "../components/adminnavbuttons";
import { BiTrash } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";
import { useSelector } from "react-redux";
import {selectAppStats} from "../state/slices/appSlice"
import fetchData from "../fetchData"
import  {developmentApiEntryPoint} from "./register"
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
const token= localStorage.getItem("support_token")
export const EmptyTable= ()=><p className="text-center">Nothing to display</p>
const PendingDeposits = () => {
  const appStats=useSelector(selectAppStats)
  console.log(appStats)
  const navigate=useNavigate()
  const pendingInvestments= appStats.allInvestments.filter(x=>x.status==="pending")
  const approveInvestment=(id,name,amount)=>{
    const canProceed=window.confirm(`Are you sure you want to approve the deposit of ${amount} by ${name}`)
  if(canProceed){
    fetchData(
      `${developmentApiEntryPoint}/admin/approvedeposit/${id}`,
      (data)=>{
        alert("Approved✔")
        navigate("/admin")
      },
      (message)=>{
        alert(message)
      },
      "POST",
      {},
    token
    )
  }
  }
  
  const deleteInvestment=(id,name,amount)=>{
    const canProceed=window.confirm(`Are you sure you want to delete the deposit of ${amount} by ${name}`)
  if(canProceed){
    fetchData(
      `${developmentApiEntryPoint}/admin/declinedeposit/${id}`,
      (data)=>{
        alert("🚮 deleted")
        navigate("/admin")
      },
      (message)=>{
        alert(message)
      },
      "POST",
      {},
    token
    )
  }
  }
  console.log(pendingInvestments)
  return (
    <div className="container-fluid">
      {/* Top Bar */}
      <div className="container-fluid  px-0">
        <div className="top-bar row gx-0 align-items-center d-none d-lg-flex">
          <div className="col-lg-6 px-5 text-start">
            <small>
              <i className="fa fa-map-marker-alt text-primary me-2"></i>123
              Street, New York, USA
            </small>
            <small className="ms-4">
              <i className="fa fa-clock text-primary me-2"></i>9.00 am - 9.00 pm
            </small>
          </div>
          <div className="col-lg-6 px-5 text-end">
            <small>
              <i className="fa fa-envelope text-primary me-2"></i>
              info@healthsupport.com
            </small>
          </div>
        </div>

        {/* Navbar */}
       <Header/>
        <hr
          style={{
            backgroundColor: "rgba(0,0,0,0.4)",
            position: "relative",
            top: "10px",
          }}
        />
      </div>

      {/* Quick Links */}

      <div style={{ marginTop: "50px" }}>
        <p className="h4 text-center mb-4 links-text">Quick links:</p>

        <NavButtons />
      </div>

      {/* User Table */}
      <Card className="mt-4">
        <Card.Header>
          <h3 className="text-center grayish">Pending Deposits</h3>
        </Card.Header>
        {pendingInvestments.length>0?(<Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Amount</th>
                <th>Coin</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingInvestments.map((invest, index)=>{
                 return <tr>
                  <td>{index+1}</td>
                  <td>{invest.userId.name}</td>
                  <td> ${invest.amount}</td>
                  <td >{invest.coin}</td>
                  <td>
                    <Button onClick={()=>{deleteInvestment(invest._id,invest.userId.name, invest.amount)}} variant="outline-danger mx-4">
                      <BiTrash />
                    </Button>
                    <Button onClick={()=>{approveInvestment(invest._id,invest.userId.name, invest.amount)}} variant="outline-info">
                      <BsCheck />
                    </Button>
                  </td>
                </tr>
              })}
              
            
            </tbody>
          </Table>
        </Card.Body>):(<p className="text-center">Nothing to display</p>)}
      </Card>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PendingDeposits;
