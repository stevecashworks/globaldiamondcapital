import React, { useEffect, useState } from "react";
import { Table, Button, InputGroup, FormControl } from "react-bootstrap";
import fetchData from "../fetchData";
import { developmentApiEntryPoint } from "./register";
import { useNavigate } from "react-router-dom";

const TravelAdminPage = () => {
    const [allTrips, setAllTrips]= useState([])
    const navigate= useNavigate()
    useEffect(()=>{
        fetchData(
            `${developmentApiEntryPoint}/payments/alltrips`,
            (data)=>{
                setAllTrips(data.result)
            },
            (message)=>{
                alert(message)
                navigate("/admin/trips")
            }
        )
    },[])
    console.log({allTrips})
    const travelRequests = [
        { id: 1, userName: "John Doe", destination: "Paris", startPoint: "London" },
        { id: 2, userName: "Jane Smith", destination: "New York", startPoint: "Toronto" },
    { id: 3, userName: "Ali Khan", destination: "Dubai", startPoint: "Mumbai" },
  ];

  const handleSetCost = (id,cost) => {
    if(!cost){
        alert("enter an amount to proceed")
        return
    }
      const canProceed= window.confirm(`Cost for request ${id} set to ${cost}`);
      if(canProceed){
        fetchData(
            `${developmentApiEntryPoint}/payments/edittrip/${id}`,
            (data)=>{
              alert("Successful ✔")
              navigate("/")
            },
            (message)=>{
              alert(message)
            },
            'POST',
            {paymentStatus:"pending",cost}
        )
      }
      // Add logic here to save the cost to the database or state
    };
    const TripRow=({index,request})=>{
            const [cost,setCost]=useState(request.cost)
             
            return(<tr key={request._id}>
           <td>{index+1}</td>
           <td>{request.user.name}</td>
           <td>{request.startingPoint}</td>
           <td>{request.destination}</td>
           <td>
            {Boolean(request.cost)?<p>${request.cost}</p> :<InputGroup>
               <FormControl
                 type="number"
                 placeholder="Enter cost"
                 onChange={(e)=>{setCost(e.target.value)}}
                 />
             </InputGroup>}
           </td>
           <td>
             <Button
               variant="primary"
               disabled={Boolean(request.cost)}
               onClick={() => handleSetCost(request._id, cost)}
               >
               Set Cost
             </Button>
           </td>
         </tr>)
           }
    
    
    return (
        <div className="p-4">
      <h1 className="text-center mb-4">Travel Requests</h1>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>Start Point</th>
              <th>Destination</th>
              <th>Estimated Cost</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allTrips.map((request, index) =><TripRow index={index} request={request}/>)}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default TravelAdminPage;
