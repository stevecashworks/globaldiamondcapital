import React ,{useState} from "react";
import { Navbar, Nav, NavDropdown, Button, Table, Card,Image, Form, Modal} from "react-bootstrap";
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
import { CiTrash,CiMail,CiEdit } from "react-icons/ci";
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
  const [editingUser, setEditingUser] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [savingUser, setSavingUser] = useState(false)
  const navigate= useNavigate()
  const openEditUser = (user) => {
    setEditingUser(user)
    setEditForm({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      address: user.address || "",
      companyAddress: user.companyAddress || "",
      idImg: user.idImg || "",
      walletIds: {
        ethereum: user.walletIds?.ethereum || "none",
        usdt: user.walletIds?.usdt || "none",
        dogecoin: user.walletIds?.dogecoin || "none",
        bitcoin: user.walletIds?.bitcoin || "none",
      },
    })
  }
  const saveUserDetails = (event) => {
    event.preventDefault()
    setSavingUser(true)
    fetchData(
      `${developmentApiEntryPoint}/users/editdetails/${editingUser._id}`,
      () => {
        setSavingUser(false)
        setEditingUser(null)
        alert("User details updated successfully")
        navigate("/admin")
      },
      (message) => {
        setSavingUser(false)
        alert(message || "Unable to update user details")
      },
      "POST",
      editForm,
      localStorage.getItem("support_token")
    )
  }
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

  const suspendUser=async(id, name)=>{
    try{
      console.group(id)
      const proceed= window.confirm(`are you sure you want to suspend the account with the name: ${name}?`) 
      if(proceed){
      const response= await  fetch(`${developmentApiEntryPoint}/admin/suspendaccount/${id}`,{
          method:"post",
          headers:{
            "Content-Type":"application/json",
            token:localStorage.getItem("support_token")
          }
        })
        const data= await response.json()
        console.log(data)
        if(data.success){ 
          alert("Account suspended successfully")
        }
        else{
          alert(data.result)
        }
      }
    }catch(err){
      console.log(err.message)
      alert(err.message)
    }
    navigate("/")
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
                  <tr key={user._id}>
                  <td>{user.idImg?<Image width={30} style={{objectFit:"cover", borderRadius:"50%"}} height={30} src={user.idImg}/>:"unavailable"}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin?"Admin":"client"}</td>
                  <td style={{position:"relative"}}>{user.phone}
                  {user.phone && <a target="_blank" rel="noreferrer" href={`https://api.whatsapp.com/send/?phone=${user.phone}&text&type=phone_number&app_absent=0`}>

                      <FaWhatsappSquare style={{fontSize:"25px",position:"absolute",right:"0px",cursor:"pointer"}}/>
                  </a>}
                    
                  </td>
                  <td style={{textTransform:"capitalize"}} className={userIsApproved?"text-success":"text-danger"}>{user.status}</td>
                  <td>
                    <StyledButton variant="outline-primary" onClick={()=>openEditUser(user)} title="Edit user details"><CiEdit/></StyledButton>
                    {!userIsApproved&&<StyledButton onClick={()=>{approveUser(user.name,user._id)}}>✔</StyledButton>}
                  <StyledButton variant="outline-success" disabled={loading} onClick={()=>{promoteUser(user._id ,user.name,user.isAdmin)}} size="sm"><IoPersonAdd/>{loading&&<ButtonSpinner/>}</StyledButton>
                  <StyledButton variant="outline-secondary" onClick={()=>{demoteUser(user._id ,user.name,user.isAdmin)}} disabled={loading} ><IoPersonRemove/> {loading&&<ButtonSpinner/>}</StyledButton>
                  <StyledButton variant="outline-primary"  href={`/admin/credituser?id=${user._id}`} ><MdOutlineAttachMoney/> </StyledButton>
                  <StyledButton href={`/admin/sendmessage?id=${user._id}`} variant="outline-info" ><CiMail/></StyledButton>
                  <StyledButton onClick={()=>{deleteUser(user._id,user.name)}} variant="outline-danger" ><CiTrash/>{loading&&<ButtonSpinner/>}</StyledButton>
                  <StyledButton variant="outline-danger" onClick={()=>{suspendUser(user._id, user.name)}}>Suspend</StyledButton>

                  </td>
                </tr>
                )
              })}
             
              
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Footer */}
      <Modal show={Boolean(editingUser)} onHide={()=>setEditingUser(null)} centered>
        <Form onSubmit={saveUserDetails}>
          <Modal.Header closeButton>
            <Modal.Title>Edit User Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control required value={editForm.name || ""} onChange={(event)=>setEditForm({...editForm, name:event.target.value})}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control required type="email" value={editForm.email || ""} onChange={(event)=>setEditForm({...editForm, email:event.target.value})}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control value={editForm.phone || ""} onChange={(event)=>setEditForm({...editForm, phone:event.target.value})}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control value={editForm.address || ""} onChange={(event)=>setEditForm({...editForm, address:event.target.value})}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Company Address</Form.Label>
              <Form.Control value={editForm.companyAddress || ""} onChange={(event)=>setEditForm({...editForm, companyAddress:event.target.value})}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Government ID Image URL</Form.Label>
              <Form.Control value={editForm.idImg || ""} onChange={(event)=>setEditForm({...editForm, idImg:event.target.value})}/>
            </Form.Group>
            <hr />
            <h6>Wallet Addresses</h6>
            {[
              ["ethereum", "Ethereum"],
              ["usdt", "USDT"],
              ["dogecoin", "Dogecoin"],
              ["bitcoin", "Bitcoin"],
            ].map(([coin, label])=>(
              <Form.Group className="mb-3" key={coin}>
                <Form.Label>{label}</Form.Label>
                <Form.Control
                  value={editForm.walletIds?.[coin] || "none"}
                  onChange={(event)=>setEditForm({
                    ...editForm,
                    walletIds: {...editForm.walletIds, [coin]:event.target.value},
                  })}
                />
              </Form.Group>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={()=>setEditingUser(null)} disabled={savingUser}>Cancel</Button>
            <Button type="submit" variant="primary" disabled={savingUser}>{savingUser ? "Saving..." : "Save Changes"}</Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Footer />
    </div>
  );
};

export default AllUsers;
