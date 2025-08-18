import React, { useState } from "react";
import { Table, Modal, Button, Image, Badge } from "react-bootstrap";
import { FaCheck, FaTrash, FaDownload } from "react-icons/fa";
import {CiMail} from "react-icons/ci"
import {useSelector} from "react-redux"
import {selectAppStats} from "../state/slices/appSlice"
import { FaWhatsapp } from "react-icons/fa6";
import  styled from "styled-components"
import  Header from "../components/header"
import  Footer from "../components/footer"
import fetchData from "../fetchData";
import { developmentApiEntryPoint } from "./register";
import { useNavigate } from "react-router-dom";




const FilterCon=styled.div`
display:flex;
align-items:center;
justify-content: space-between;
margin-bottom:40px;



`
const FilterSubCon=styled.div`
display:flex;
 flex-direction:column;
 text-transform:capitalize;
 gap:10px;

`

const PaymentsPage = () => {
  const [show, setShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const allPayments= useSelector(selectAppStats)["allPayments"]
  const navigate= useNavigate()

  const handleShow = (image) => {
    setSelectedImage(image);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setSelectedImage("");
  };
  const handleChangeService=(e)=>{
    alert(e.target.value)

  }

  const getDownloadUrl = (url) => {
    // Modify URL to force download
    const parts = url.split("/upload/");
    return `${parts[0]}/upload/fl_attachment/${parts[1]}`;
  };

  const payments = [
    {
      username: "John Doe",
      proof:
        "https://res.cloudinary.com/dhvl53iga/image/upload/v1737200008/byz2oulaxmwyoutsjlha.jpg",
      amount: "$100",
      meansOfPayment: "Credit Card",
      service: "Web Hosting",
      plan: "Premium",
      status: "Pending",
      date: "2025-01-15",
    },
    {
      username: "Jane Smith",
      proof:
        "https://res.cloudinary.com/dhvl53iga/image/upload/v1737200008/byz2oulaxmwyoutsjlha.jpg",
      amount: "$200",
      meansOfPayment: "PayPal",
      service: "Cloud Storage",
      plan: "Business",
      status: "Approved",
      date: "2025-01-10",
    },
    // Add more payment data as needed
  ];

  const handleApprove = (username,id,status) => {
    // Logic to handle approval
  
    if(status==="approved"){
      alert("payment has already been approved")
      return
    }
    const proceed= window.confirm(`Approve payment for ${username}?`);
    if(proceed){
      fetchData(
        `${developmentApiEntryPoint}/payments/approve/${id}`,
      (data)=>{
          alert("Successful ✔")
          navigate("/")
      },
      (message)=>{
          alert(message)
      },
      "POST",
      {},
      localStorage.getItem("support_token")

      )
    }

  };

  const handleDelete = (username) => {
    alert(`Deleted payment for ${username}`);
    // Logic to handle deletion
  };

  return (
    <>
    <Header/>
    <div className="container mt-4">
      <h2 className="text-secondary mb-4 text-center h4">Filter</h2>
      <FilterCon>
    <FilterSubCon>
      <label htmlFor="serviceFilter">filter by service:</label>
      <select onChange={(e)=>{handleChangeService(e)}} id="serviceFilter">
        <option value="medicalSupport">Medical support</option>
        <option value="healthInsurance">Health Insurance</option>
        <option value="covid91Benefits">Covid 19 Benefits</option>
        <option value="cashContribution">Cash contribution</option>
        <option value="travelAndExpense">Travel & expense</option>

      </select>
    </FilterSubCon>

    <FilterSubCon>
      <label htmlFor="paymentMethod">filter by payment method:</label>
      <select onChange={(e)=>{handleChangeService(e)}} id="paymentMethod">
        <option value="crypto">Crypto</option>
        <option value="bankTransfer">Bank transfer</option>
       

      </select>
    </FilterSubCon>

      </FilterCon>
      <h2 className="mb-4">Payments</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Proof of Payment</th>
            <th>Amount</th>
            <th>Means of Payment</th>
            <th>Service Paid For</th>
            <th>Plan</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allPayments.map((payment, index) => (
            <tr key={index}>
              <td>{payment.user.name}</td>
              <td>
                <Image
                  src={payment.proof}
                  alt="Proof of Payment"
                  thumbnail
                  style={{ cursor: "pointer", maxWidth: "100px" }}
                  onClick={() => handleShow(payment.proof)}
                  />
              </td>
              <td>{payment.amount}</td>
              <td>{payment.paymentMethod}</td>
              <td>{payment.service}</td>
              <td>{payment.plan}</td>
              <td>
                <Badge
                  bg={payment.status === "approved" ? "success" : "warning"}
                  text="dark"
                  >
                  {payment.status}
                </Badge>
              </td>
              <td>{payment.date}</td>
              <td>
                <Button
                  variant="outline-success"
                  className="me-2"
                  onClick={() => handleApprove(payment.user.name, payment._id,payment.status)}
                >
                  <FaCheck />
                </Button>

                <Button href={`/admin/sendmessage?id=${payment.user._id}`}  variant="outline-info" className="me-2"><CiMail/></Button>
                <Button href={`https://api.whatsapp.com/send/?phone=${payment.user.phone}&text&type=phone_number&app_absent=0`}  variant="outline-success" className="me-2"><FaWhatsapp/></Button>

                <Button
                  variant="outline-danger"
                  onClick={() => handleDelete(payment.username)}
                  >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for displaying full image */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Proof of Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Image src={selectedImage} alt="Proof of Payment" fluid />
        </Modal.Body>
        <Modal.Footer>
          <a
            href={getDownloadUrl(selectedImage)}
            download
            className="btn btn-primary"
            >
            <FaDownload className="me-2" />
            Download
          </a>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    <Footer/>
            </>
  );
};

export default PaymentsPage;
