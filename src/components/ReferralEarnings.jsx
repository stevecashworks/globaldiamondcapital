import React from 'react'
import styled from 'styled-components'
const Container= styled.div`

`
const Title=styled.h4`
text-align:center;
`
const DownLineCon=styled.div`
  width:600px;
  margin:20px auto;
  @media(max-width:600px){
    width:95vw;
    margin-top:40px;
  }
`
const Table=styled.table`
  width:100%;
  margin:20px auto;
  border-collapse:collapse;

`
const Thead=styled.thead`
  width:100%;

`
const Th= styled.th`
color:rgb(9, 19, 9);
flex:1;
font-weight:600;
`
const Tbody=styled.tbody`
  width:100%;
`
const Td=styled.td`
flex:1;
padding-top: 10px;
`
const Tr= styled.tr`
border-bottom:1px solid rgb(0,0,0,0.1);
min-height:50px;
display: flex;
width:100%;
gap:20px;
`

const ReferralEarnings = ({downLines, referrals, referralBonus}) => {
  const tableHeadings= ["Name","Date Joined", "Your Earnings"]
  const getUserTotal= (id)=>{
    return referrals.filter(x=>x.by===id).reduce((a,b)=>a+b.amount,0)
  }
  const total= referrals.reduce((a,b)=>a+b.amount, 0)
  return (
  <Container>
  <Title>
  Your Downlines
  
  </Title>
  <DownLineCon>{
    downLines.length===0?(  <div className='alert alert-success text-center'>You have no referrals yet </div>):
     <Table>
    <Thead>
      <Tr>
        {tableHeadings.map(heading=><Th>{heading}</Th>)}
      </Tr>
    </Thead>
    <Tbody>
      {downLines.map(downline=>{
        return (
          <Tr key={downline._id}>
            <Td>{downline.name}</Td>
            <Td>{new Date(downline.createdAt).toDateString()}</Td>
            <Td>${getUserTotal(downline._id)}</Td>

          </Tr>
        )
      })}
      <Tr style={{fontWeight:600, fontSize:"1.2rem"}}>
        <Td>Total left after expenditure:</Td>
        <Td></Td>
        <Td>$ {referralBonus}</Td>
      </Tr>
    </Tbody>
  </Table>
    }

 
  </DownLineCon>
 

  </Container>
  )
}

export default ReferralEarnings