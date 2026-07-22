import styled from "styled-components"
import bonus_logo from "../assets/referral_bonus.png"
import toast from "react-hot-toast"


const  Container=styled.div`
    width:80vw;
    margin:40px auto;
    height:300px;
    display:flex;
    align-items:center;
    min-height:500px;
    background-color: rgba(168, 238, 205,0.2);
    @media(max-width:600px){
        flex-direction: column-reverse;
        height:auto;
        width:100vw;
        padding-bottom:20px;
    }

`
const Left = styled.div`
flex:1;
box-sizing:border-box;
padding-left:30px;
padding-top:30px;
height:100%;
display:flex;
flex-direction: column;
justify-content:center;
`
const Right = styled.div`
flex:1;

background-color: rgba(168, 238, 205,0.2);
height:500px;
`
const ImgCon=styled.img`
width:90%;
max-height: 500px;
    
`
const Highlighted=styled.h3`
    color:var(--dark-green);
`
const Header=styled.h3`

`
const ReferralLink=styled.div`
width:80%;
background-color:white;
height:50px;
color:rgb(0,0,0,0.5);
display:flex;
align-items: center;
padding-left: 10px;
@media(max-width:500px){
    height:80px;
    font-size:14px;
}
`
const Text= styled.p`
margin-top:30px;
font-size:20px;
width:300px;
`
const CopyButton=styled.button`
outline:none;
border:none;
background-color: var(--dark-green);
color:white;
width:150px;
margin-top:20px;
height:40px;
border-radius:10px
`
const ReferralBonus= ({referralLink})=>{
const copyCode=async()=>{
    try{
         await navigator.clipboard.writeText(referralLink)
         toast.success("Copied successfully" ,{duration:5000})
    }
    catch(err){
    toast.error("Something Went Wrong")
    }
}
    return(
        <Container>
        <Left>
            <Header>
                Refer Friends.
                <Highlighted>Earn Rewards</Highlighted>

            </Header>
                <Text>Share your unique link, invite you friends to join and profit when they do </Text>
        <ReferralLink>
        {referralLink}
        </ReferralLink>
        <CopyButton onClick={copyCode}>Copy</CopyButton>
        </Left>
        <Right>
        <ImgCon src={bonus_logo}/>
        </Right>

        </Container>
    )
}


export default ReferralBonus