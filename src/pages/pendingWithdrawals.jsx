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
import fetchData from "../fetchData";
import { developmentApiEntryPoint } from "./register";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
const token= localStorage.getItem("support_token")

const PendingWithdrawals = () => {
  const appStats= useSelector(selectAppStats)
  const navigate=useNavigate()
  const pendingWithdrawals= appStats.allWithdrawals.filter(x=>x.status==="pending")
  console.log(pendingWithdrawals)
  const approveWithdrawal=(id,name,amount)=>{
    const canProceed=window.confirm(`Are you sure you want to approve the withdrawal of ${amount} by ${name}`)
  if(canProceed){
    fetchData(
      `${developmentApiEntryPoint}/admin/approvewithdrawal/${id}`,
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

  const deleteWithdrawal=(id,name,amount)=>{
    const canProceed=window.confirm(`Are you sure you want to delete the withdrawal of ${amount} by ${name}`)
  if(canProceed){
    fetchData(
      `${developmentApiEntryPoint}/admin/declinewithdrawal/${id}`,
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
  return (
    <div className="container-fluid">
      {/* Top Bar */}
      <Header/>

      {/* Quick Links */}

      <div style={{ marginTop: "50px" }}>
        <p className="h4 text-center mb-4 links-text">Quick links:</p>

        <NavButtons />
      </div>

      {/* User Table */}
      <Card className="mt-4 mb-4">
        <Card.Header>
          <h3 className="text-center grayish">Pending Withdrawal</h3>
        </Card.Header>
        <Card.Body>
          {pendingWithdrawals.length>0?(<Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Amount</th>
                <th>Wallet ID</th>
                <th>Coin</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingWithdrawals.map(withdrawal=>{
                return(
                  <tr>
                <td>{withdrawal.userId.name}</td>
                <td>{withdrawal.amount}</td>
                <td>{withdrawal.wallet.walletId}</td>
                <td>{withdrawal.wallet.coin}</td>
                <td>
                  <Button variant="outline-danger mx-4">
                    <BiTrash onClick={()=>{deleteWithdrawal(withdrawal._id, withdrawal.userId.name,withdrawal.amount)}} />
                  </Button>
                  <Button onClick={()=>{approveWithdrawal(withdrawal._id, withdrawal.userId.name,withdrawal.amount)}} variant="outline-info">
                    <BsCheck />
                  </Button>
                </td>
              </tr>
                )
              })}
              
          
            </tbody>
          </Table>):<p className="text-center">Nothing to display</p>}
        </Card.Body>
      </Card>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PendingWithdrawals;
