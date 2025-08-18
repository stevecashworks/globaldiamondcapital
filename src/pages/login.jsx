import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import responsive from "../responsive.js";
import { RiMenu4Line } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import {developmentApiEntryPoint} from "./register" ;
import ButtonSpinner from "../components/buttonspinner.jsx";
import fetchData from "../fetchData.js";
const Nav = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  ${responsive("tablet", { display: "none" })};
`;
const CreditCard = styled.div`
  background-color: rgba(0, 0, 0, 0.2); /* Set a transparent background color */
  backdrop-filter: blur(10px); /* Apply a blur effect */
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* Add a subtle shadow */
  padding: 20px;
  width: 250px;
  height: 400px;
  ${responsive("tablet", { display: "none" })};
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Container = styled.div`
  display: grid;
  place-items: center;
  height: calc(100vh - 70px);
  position: relative;
  overflow: hidden;
`;
const Visa = styled.div`
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  letter-spacing: 3px;
  font-size: 20px;
  text-align: center;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  height: 70px;
`;
const LogoText = styled.p`
  font-size: 18px;
  color: white;
  letter-spacing: 2px;
`;
const navLinks = [
  { text: "Home", path: "/" },
  { text: "Contact", path: "#" },
  { text: "About us", path: "#" },
  { text: "Support", path: "#" },
];

const Anc = styled.a`
  display: block;
  color: white;
  text-decoration: none;
  font-size: 14px;
  font-weight: 400;
`;

const BtnsCon = styled.div`
  display: flex;
  gap: 20px;
  ${responsive("tablet", { display: "none" })};
`;
const Btn = styled.button`
  color: white;
  background-color: #1abc9c;
  border: none;
  border-radius: 10px;
  opacity: ${(props) => (props.blur ? "0.3" : "1")};
  width: 120px;
  height: 25px;
  transition: all 0.5s ease;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;
const SubCon = styled.div`
  display: flex;
  background-color: rgb(0, 0, 0, 0.1);
  z-index: 2;
`;

const FormCon = styled.div`
  width: 500px;
  position: relative;
  overflow-x: hidden;
  ${responsive("tablet", { height: "500px", top: "100px" })}
`;
const FormSubCon = styled.div`
  padding-left: 30px;
  position: absolute;
  width: 100%;
  transition: all 1.5s ease;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;
const Label = styled.label`
  font-size: 14px;
  margin-bottom: 20px;
  color: rgb(255, 255, 255, 0.4);
`;

const Next = styled.button`
  font-weight: bold;
  color: white;
  border: none;
  margin: 20px auto;
  background-color: rgb(56, 92, 158);
  width: 200px;
  height: 30px;
  border-radius: 10px;
`;
export const HighLight = styled.span`
  color: #1abc9c;
`;
const logVals = (email, password, fn,nav, setLoading) => {
  fn("Loading ...");
  setLoading(true)
  try {
    fetchData(
      `${developmentApiEntryPoint}/users/login`,
      (data)=>{
      
        localStorage.setItem("support_token",data.result.token)
        nav("/")
      },
      (message)=>{
        alert(message)
        nav("/")
      },
      "POST",
      {email,password}
    )


    }
    catch(err){
      alert(err.message)
    }
  }



const CreditBottom = styled.div`
  background-color: rgb(0, 0, 0, 0.1);
  color: white;
  margin-top: 10px;
  font-size: 12px;
  text-align: center;
`;
const HamCon = styled.div`
  display: none;
  ${responsive("tablet", { display: "flex" })}
`;
const MobileNav = styled.div`
  width: 100vw;
  height: 400px;
  align-items: center;
  color: white;
  justify-content: center;
  font-weight: bold;
  display: none;
  transform: scaleY(${(props) => (props.open ? 1 : 0)});
  transition: all 0.5s ease;
  background-color: rgb(0, 0, 0, 0.4);
  position: absolute;
  top: 70px;
  gap: 15px;
  flex-direction: column;
  text-transform: capitalize;
  z-index: 4;
  ${responsive("tablet", { display: "flex" })};
`;

const Login = () => {
  const navigate = useNavigate();
  const [loading,setLoading]= useState(false)
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState("");
  const [menuOpen, setMenuOPen] = useState(false);
  const HamButton = menuOpen ? AiOutlineClose : RiMenu4Line;
  const links = [
    { title: "home", path: "/home" },
    { title: "register", path: "/register" },
  ];

  return (
    <div className="register-con">
      <Header>
        <Logo>
          <LogoText>
            Global  Diamond
            <HighLight>Capital</HighLight>
          </LogoText>
        </Logo>
        <Nav>
          {navLinks.map((x) => (
            <Anc href={x.path}>{x.text}</Anc>
          ))}
        </Nav>
        <BtnsCon>
          <Btn onClick={() => navigate("/register")}>Register</Btn>
          <Btn
            blur={true}
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Btn>
        </BtnsCon>
        <HamCon onClick={() => setMenuOPen(!menuOpen)}>
          <HamButton style={{ fontSize: "23px" }} />
        </HamCon>
      </Header>
      <MobileNav open={menuOpen}>
        {links.map((link) => {
          return <Anc href={link.path}>{link.title}</Anc>;
        })}
      </MobileNav>
      <Container>
        <div className="blob1"></div>
        <div className="blob2"></div>
        <SubCon>
          <CreditCard>
            <Visa style={{ display: "flex", justifyContent: "center" }}>
              <Logo style={{ margin: "10px auto" }}>
                <LogoText>
                  
                  <HighLight></HighLight>
                </LogoText>
              </Logo>
            </Visa>

            <CreditBottom>{message}</CreditBottom>
          </CreditCard>
          <FormCon>
            <FormSubCon>
              <FormGroup>
                <Label htmlFor="firstName">Email:</Label>
                <input
                  className="nameInp"
                  name="firstname"
                  id="firstname"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="last-name">Password</Label>
                <input
                  className="nameInp"
                  id="last-name"
                  name=""
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </FormGroup>
              <a href="/forgotpassword" style={{textDecoration:"none",display:"block"}}> forgot password?</a>
              <Next disabled={loading} onClick={() => logVals(email, password, setMessage, navigate,setLoading)}>
                Login {loading&&<ButtonSpinner/>}
              </Next>
            </FormSubCon>
          </FormCon>
        </SubCon>
      </Container>
    </div>
  );
};
export default Login;
