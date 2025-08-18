// NavButtons.js
import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NavButtons = () => {
  const navigate= useNavigate()
  const logout=()=>{
    const proceed=window.confirm("Are you sure you want to logout?");
    if(proceed){
      localStorage.removeItem("support_token")
      navigate("/")
    }
  }
  return(
  <div className="d-flex justify-content-center flex-wrap gap-3 mt-4">
    <Button variant="secondary" href="/admin/users">
      Users
    </Button>
    <Button variant="secondary" href="/admin/payments">Payments</Button>
    <Button variant="secondary" href="/admin/trips">trips</Button>
    <Button variant="secondary" href="/admin/pendingwithdrawals">
      Pending Withdrawals
    </Button>
    <Button variant="secondary" href="/admin/pendingdeposits">
      Pending Deposits
    </Button>
    <Button variant="secondary" href="/admin/approveddeposits">
      Approved Deposits
    </Button>
    <Button variant="secondary" href="/admin/approvedwithdrawals">
      Approved Withdrawals
    </Button>
    <Button variant="secondary" href="/admin/setcoins">
      Edit wallets
    </Button>
    <Button variant="secondary" onClick={logout}>
      Logout
    </Button>
  </div>
)};

export default NavButtons;
