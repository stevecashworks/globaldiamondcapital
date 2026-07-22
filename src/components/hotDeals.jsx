import { Key } from "@mui/icons-material"
import { duration } from "@mui/material"
import styled from "styled-components"
import {DollarSign}  from "lucide-react"
import {Button} from "react-bootstrap"
import Countdown from "react-countdown"

const  DealsCon=styled.div`
display:flex;
align-items:center;
justify-content:center;
margin:20px auto;
gap:15px;
@media (max-width:700px){
    flex-direction:column
}
`
const DealCard= styled.div`
display:flex;
flex-direction:column;
box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;

background-color:rgb(255, 255, 255);
border-radius: 15px;
width:40%;
@media (max-width:700px){
    width:90vw
}
`
const  DealTop=styled.div`
display:flex;
justify-content: space-between;
`
const DealLogoCon=styled.div`
color:black;
background-color:rgb(244, 247, 246);
width:30px;
height:30px;
display:flex;
align-items:center;
justify-content:center;
border-radius:50%;
font-size:12px;
`
const dummyDeals= [
    {
        offer_name:"Deal1",
        amount: 2000,
        roi:50,
        duration:1,
        expiresIn:8
    },
    {
        offer_name:"Deal2",
        amount: 2000,
        roi:50,
        duration:1
    },
   
]

const HotDeals=()=>{
    return(
   <DealsCon>
    <DealCard>

<gecko-coin-price-chart-widget locale="en" outlined="true" coin-id="tether" initial-currency="usd" width="0"></gecko-coin-price-chart-widget>
    </DealCard>
    <DealCard>

<gecko-coin-price-chart-widget  locale="en" outlined="true" initial-currency="usd" width="0"></gecko-coin-price-chart-widget>
    </DealCard>



   </DealsCon>
    )
}
export default HotDeals