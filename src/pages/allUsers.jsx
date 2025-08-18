import React ,{useState} from "react";
import { Navbar, Nav, NavDropdown, Button, Table, Card,Image} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { MdOutlineAttachMoney } from "react-icons/md";
import {selectAppStats} from "../state/slices/appSlice"
import Footer from "../components/footer";
import NavButtons from "../components/adminnavbuttons";
import { useSelector } from "react-redux";
import fetchData from "../fetchData";
import { useNavigate } from "react-router-dom";
import ButtonSpinner from "../components/buttonspinner";
import { developmentApiEntryPoint } from "./register";
import { CiTrash,CiMail } from "react-icons/ci";
import { IoPersonRemove, IoPersonAdd } from "react-icons/io5";
import styled from "styled-components";
import { FaWhatsappSquare } from "react-icons/fa";
import Header from "../components/header";
const StyledButton=styled(Button)`
margin-left:4px;
`


const AllUsers = () => {
  const appStats=useSelector(selectAppStats)
  const [loading, setLoading]= useState(false)
  const navigate= useNavigate()
  const approveUser=(name,id)=>{
    const canProceed=window.confirm(`Are you  sure you want to approve user: ${name} `)
    if(canProceed){
      fetchData(
        `${developmentApiEntryPoint}/users/approve/${id}`,
        (data)=>{
          alert("Approved successfully ✔")
          navigate("/admin")
        },
        (message)=>{
          alert(message)
          navigate("/admin")
        },
        "POST",
        {},
        localStorage.getItem("support_token")
      )
      
    }
  }

  const promoteUser=(id,name,isAdmin)=>{
    if(isAdmin){
      alert(`${name} is already an admin`)
    }
    else{
      const proceed= window.confirm(`are you sure you want to make ${name} an admin?`)
      if(proceed){
        setLoading(true)
        fetchData(
          `${developmentApiEntryPoint}/users/promoteUser/${id}`,
          (data)=>{
            alert("successful")
            navigate("/")
          },
          (message)=>{
            alert(message)
            navigate("/")
          }, "POST",
          {},
          localStorage.getItem("support_token")
          )
      }
      
    }
  }

  const demoteUser=(id,name,isAdmin)=>{
    if(!isAdmin){
      alert(`${name} is already a regular user`)
    }
    else{
      const proceed= window.confirm(`are you sure you want to make ${name} a regular user?`)
      if(proceed){
        setLoading(true)
        fetchData(
          `${developmentApiEntryPoint}/users/demoteUser/${id}`,
          (data)=>{
            alert("successful")
            navigate("/")
          },
          (message)=>{
            alert(message)
            navigate("/")
          }, "POST",
          {},
          localStorage.getItem("support_token")
          )
      }
      
    }
  }


  const deleteUser=(id,name)=>{
    const canProceed= window.confirm(`Are you sure you want to  permanently delete  ${name} as a user` )
    if(canProceed){
      fetchData(
        `${developmentApiEntryPoint}/users/delete/${id}`,
        (data)=>{
          alert("Successful")
          navigate("/")
        },
        (message)=>{
            alert(message)
            navigate("/")
        },"POST",
        {},
        localStorage.getItem("support_token")
      )
    }
  }

  const {allUsers}=appStats
  console.log(allUsers)

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
      <Card className="mt-4">
        <Card.Header>
          <h3 className="text-center grayish">User List</h3>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map(user=>{
                const userIsApproved= user.status==="approved"
                return(
                  <tr>
                  <td>{user.idImg?<Image width={30} style={{objectFit:"cover", borderRadius:"50%"}} height={30} src={user.idImg}/>:"unavailable"}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin?"Admin":"client"}</td>
                  <td style={{textTransform:"capitalize"}} className={userIsApproved?"text-success":"text-danger"}>{user.status}</td>
                  <td style={{position:"relative"}}>{user.phone}
                  <a target="_blank" href={`https://api.whatsapp.com/send/?phone=${user.phone}&text&type=phone_number&app_absent=0`}>

                      <FaWhatsappSquare style={{fontSize:"25px",position:"absolute",right:"0px",cursor:"pointer"}}/>
                  </a>
                    
                  </td>
                  <td>
                    {!userIsApproved&&<StyledButton onClick={()=>{approveUser(user.name,user._id)}}>✔</StyledButton>}
                  <StyledButton variant="outline-success" disabled={loading} onClick={()=>{promoteUser(user._id ,user.name,user.isAdmin)}} size="sm"><IoPersonAdd/>{loading&&<ButtonSpinner/>}</StyledButton>
                  <StyledButton variant="outline-secondary" onClick={()=>{demoteUser(user._id ,user.name,user.isAdmin)}} disabled={loading} ><IoPersonRemove/> {loading&&<ButtonSpinner/>}</StyledButton>
                  <StyledButton variant="outline-primary"  href={`/admin/credituser?id=${user._id}`} ><MdOutlineAttachMoney/> </StyledButton>
                  <StyledButton href={`/admin/sendmessage?id=${user._id}`} variant="outline-info" ><CiMail/></StyledButton>
                  <StyledButton onClick={()=>{deleteUser(user._id,user.name)}} variant="outline-danger" ><CiTrash/>{loading&&<ButtonSpinner/>}</StyledButton>

                  </td>
                </tr>
                )
              })}
             
              
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AllUsers;
