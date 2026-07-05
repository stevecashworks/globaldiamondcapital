import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { BsUpload } from "react-icons/bs";
import { RiMenu4Line } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import fetchData from "../fetchData.js";
import { HighLight } from "./login";
// when using this function, use "_" undescore for css properties that have "-"
//  replace the underscores with hyphens
import responsive from "../responsive.js";

import start_Upload from "../upload";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import ErrorsModal from "../components/errorsModal";
import {
  setIsLogged,
  setUserDetails,
  selectIsLogged,
  selectUserDetails,
} from "../state/slices/userSlice.js";
import "./register.css";
import validate_form from "./Errors/validate_form";
import ButtonSpinner from "../components/buttonspinner.jsx";
export const developmentApiEntryPoint  = "https://globals-backend.onrender.com";

export const temp ="http://localhost:8080"
export const NavBar = ({ open, links, setState }) => {
  return (
    <MobileNav open={open}>
      {links.map((x) => (
        <Anc
          onClick={() => {
            setState(!open);
          }}
          href={x.path}
        >
          {x.text}
        </Anc>
      ))}
    </MobileNav>
  );
};
const Nav = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  ${responsive("tablet", { display: "none" })}
`;
const MobileNav = styled.div`
  display: flex;
  transform: scaleY(${(props) => (props.open ? 1 : 0)});
  transition: all 0.5s ease;
  transform-origin: top;
  min-height: 300px;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  position: absolute;
  top: 70px;
  background-color: rgb(0, 0, 0, 0.5);
  width: 100vw;
  z-index: 4;
`;


const CreditCard = styled.div`
  background-color: rgba(0, 0, 0, 0.2); /* Set a transparent background color */
  backdrop-filter: blur(10px); /* Apply a blur effect */
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* Add a subtle shadow */
  padding: 20px;
  width: 250px;
  height: 500px;
  overflow-x: hidden;
  ${responsive("tablet", { width: "100px", height: "500px" })};
  ${responsive("mobile", { display: "none" })};
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
  ${responsive("mobile", { display: "none" })}
`;
const Btn = styled.button`
  color: white;
  background-color: rgb(56, 92, 158);
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
  ${responsive("tablet", { height: "700px", margin_top: "30px" })};
`;

const FormCon = styled.div`
  width: 500px;
  position: relative;
  overflow-x: hidden;
  ${responsive("tablet", {
    width: "100vw",
    height: "800px",
  })};
`;
const FormSubCon = styled.div`
  padding-left: 30px;
  position: absolute;
  width: 100%;
  transition: all 1.5s ease;
`;

const InputFlex = styled.div`
  display: flex;
  gap: 40px;
  ${responsive("tablet", { flex_direction: "column", gap:"5px" })}
`;
const FormGroup = styled.div`
  margin-bottom: 20px;
  ${responsive("tablet", { margin_bottom: "0px" })}
`;
const Label = styled.label`
  font-size: 14px;
  margin-bottom: 20px;
  color: rgb(255, 255, 255, 0.4);
  ${responsive("tablet",{margin_bottom:"10px"})}
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
const BtnsFlex = styled.div`
  display: flex;
  width: 80%;
  gap: 20px;
  justify-content: left;
`;
// add more refs for the following;
//images required;
// Phone number;
// SSN;
// gov  id card  or drivers-license
const logVals = (arr, gov_Id, dispatch, navigate, setErrors,setLoading) => {
  toast("Please wait while we sign you in");
  console.log("toasting");
  let detailsObj = {};
  arr.forEach((item) => {
    detailsObj[item.name] = item.refVal.current.value;
  });
  detailsObj = { ...detailsObj, idImg: gov_Id };
  const errors = validate_form(detailsObj);
  if(detailsObj.password.length<8){
  errors.push("Password has to be eight characters or more")
  }
  if(!gov_Id){
    errors.push("Id card has not been uploaded successfully")
  }
  setErrors(errors);
  
  console.log(detailsObj);
  if (errors.length === 0) {
    fetchData(
      `${developmentApiEntryPoint}/users/register`,
      (data) => {
        console.log(data.result);
        dispatch(setIsLogged(true));
        alert("Your request has been submitted successfuly we'll get back to you when we've processed your request")
        window.localStorage.setItem("support_token", data.result.token)
        navigate("/");
      },
      (data) => {
        setErrors([data]);
        alert("An error occurred")
        navigate("/register")
      },
      "POST",
      
      {
        ...detailsObj,name:`${detailsObj.firstName} ${detailsObj.lastName}`
      }
    );
  }
};
const uploadFile = async (file, path, fn, onUpload,setUploadingState) => {
  try {
    await start_Upload(file, path, onUpload,setUploadingState);

    fn(file);
  } catch (error) {
    console.log(error);
  }
};

const FormElem = ({ type, placeholder, name, refr }) => {
  return (
    <FormGroup>
      <Label>{name}</Label>
      <input
        className="detailInp"
        ref={refr}
        type={type || "text"}
        placeholder={placeholder || ""}
        name={name}
        id={name}
      />
    </FormGroup>
  );
};

const Select = styled.select`
  color: white;
  background-color: transparent;
  height: 35px;
  width: 350px;
  outline: none;
  padding-left: 15px;
  border-radius: 7px;
  margin: 20px 0 20px 0;
  ${responsive("tablet", { width: "250px" })}
`;

const CreditBottom = styled.div`
  padding-top: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 15px;
  flex-direction: column;
  transition: all 1s ease;
  transform: ${(props) =>
    props.open ? "translateX(0)" : "translateX(- 250px)"};
`;
const ImgInpCon = styled.div`
  display: flex;
  height: 100;
  width: 200px;
  border-radius: 10px;
  background-color: rgb(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  flex-direction: column;
  ${responsive("tablet", {
    margin: "40px auto",
  })};
`;
const ImgInpCons = styled.div`
  display: flex;
  margin: 0 auto;
  gap: 30px;
  ${responsive("tablet", {
    width: "100vw",
    flex_direction: "column",
    align_items: "center",
  })}
`;
const ErrorElement = styled.p`
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: rgb(255, 255, 255, 0.6);
  width: 180px;
`;
const MenuIconContainer = styled.div`
  display: none;
  color: white;
  cursor: pointer;
  ${responsive("tablet", { display: "block" })}
`;

const Register = () => {
  const isLogged = useSelector(selectIsLogged);
  const userDetails = useSelector(selectUserDetails);
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const MenuIcon = menuOpen ? AiOutlineClose : RiMenu4Line;
  console.log({ userDetails, isLogged });
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const addressRef = useRef(null);
  const companyAddressRef = useRef(null);
  const [img_is_uploading,set_img_is_uploading]= useState(false)
  const passwordRef = useRef(null);
  const rePasswordRef = useRef(null);
  const [id_url, set_Id_Url] = useState();
  const [loading, setLoading] = useState(false);
  const links = [
    { text: "Home", path: "/home" },
    { text: "Login", path: "/login" },
    { text: "Aboutus", path: "/home/#about" },
  ];
  console.log(lastNameRef);
  //  An array of refs ....

  const allRefs = [
    { name: "firstName", refVal: firstNameRef },
    { name: "lastName", refVal: lastNameRef },
    { name: "email", refVal: emailRef },
    { name: "address", refVal: addressRef },
    { name: "phone", refVal: phoneRef },
    { name: "password", refVal: passwordRef },
    { name: "repeatpassword", refVal: rePasswordRef },
  ];

  const inpDetails = [
    { name: "Phone Number", placeholder: "e.g: (123-4567)", refr: phoneRef },
    {
      name: "Email",
      type: "email",
      placeholder: "joe@example.com",
      refr: emailRef,
    },
    { name: "Address", placeholder: "", refr: addressRef },
  ];
  const inpDetails2 = [
    {
      name: "Company Address ( for companies only )",
      placeholder: "Company's Address",
      refr: companyAddressRef,
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      refr: passwordRef,
    },
    {
      name: "Confirm password",
      type: "password",
      placeholder: "Repeat password",
      refr: rePasswordRef,
    },
  ];
  const [gov_Id, set_Gov_Id] = useState();

  const [activeIndex, setActiveIndex] = useState(0);
  const [countries, setCountries] = useState([
    { name: "United State Of America" },
  ]);
  console.log(countries);
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const raw = await fetch(
          "https://countriesnow.space/api/v0.1/countries"
        );
        const jsonData = await raw.json();
        setCountries(jsonData.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCountries();
  }, []);
  const navigate = useNavigate();
  return (
    <div className="register-con">
      <Header>
        <Logo>
          <LogoText>
            Global <HighLight>Diamond Capitals</HighLight>
          </LogoText>
        </Logo>
        <Nav>
          {navLinks.map((x) => (
            <Anc href={x.path}>{x.text}</Anc>
          ))}
        </Nav>
        <BtnsCon>
          <Btn blur={true}>Register</Btn>
          <Btn
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Btn>
        </BtnsCon>
        <MenuIconContainer
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
        >
          <MenuIcon style={{ fontSize: "24px" }} />
        </MenuIconContainer>
      </Header>
      <NavBar links={links} open={menuOpen} setState={setMenuOpen} />
      <Container>
        <ErrorsModal errors={errors} />
        <Toaster />

        <div className="blob1"></div>
        <div className="blob2"></div>
        <SubCon>
          <CreditCard>
            <Visa>Visa</Visa>

            <CreditBottom open={errors.length > 0}>
              {errors.map((err) => (
                <ErrorElement>{err}</ErrorElement>
              ))}
            </CreditBottom>
          </CreditCard>
          <FormCon>
            <FormSubCon
              style={{
                transform:
                  activeIndex === 0 ? "translateX(0)" : "translateX(-100%)",
              }}
            >
              <InputFlex>
                <FormGroup>
                  <Label htmlFor="firstName">First Name:</Label>
                  <input
                    className="nameInp"
                    name="firstname"
                    id="firstname"
                    ref={firstNameRef}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="last-name">Last Name:</Label>
                  <input
                    className="nameInp"
                    id="last-name"
                    name=""
                    ref={lastNameRef}
                  />
                </FormGroup>
              </InputFlex>
              {inpDetails.map((x) => (
                <FormElem {...x} />
              ))}
              <Next onClick={() => setActiveIndex(activeIndex + 1)}>Next</Next>
            </FormSubCon>

            <FormSubCon
              style={{
                transform:
                  activeIndex === 1 ? "translateX(0)" : "translateX(100%)",
              }}
            >
              <Select>
                {countries.map((country) => (
                  <option value={country.country} style={{ color: "black" }}>
                    {country.country}
                  </option>
                ))}
              </Select>
              {inpDetails2.map((x) => (
                <FormElem {...x} />
              ))}
              <BtnsFlex>
                <Next onClick={() => setActiveIndex(activeIndex - 1)}>
                  Prev
                </Next>
                <Next onClick={() => setActiveIndex(activeIndex + 1)}>
                  Next
                </Next>
              </BtnsFlex>
            </FormSubCon>
            <FormSubCon
              style={{
                transform:
                  activeIndex === 2 ? "translateX(0)" : "translateX(100%)",
              }}
            >
              <FormGroup style={{ marginTop: "10px" }}>
                <h4>Upload relevant images:</h4>
                <ImgInpCons>
                  <ImgInpCon
                    style={{ backgroundColor: "rgb(132,132,132,0.7)" }}
                  >
                    <label
                      className="ImgLabel"
                      style={{ backgroundColor: "white" }}
                      htmlFor="gov_Id"
                    >
                      {!gov_Id && <BsUpload color="gray" />}
                      {gov_Id && (
                        <img
                          className="userImg"
                          src={URL.createObjectURL(gov_Id)}
                        />
                      )}
                    </label>
                      {img_is_uploading&&<ButtonSpinner/>}
                    <label style={{ color: "black", textAlign: "center" }}>
                      Government approved id
                    </label>
                    <input
                      onChange={(e) => {
                        uploadFile(
                          e.target.files[0],
                          "users",
                          set_Gov_Id,
                          set_Id_Url,
                          set_img_is_uploading
                        
                        );
                      }}
                      className="detailInp"
                      style={{ display: "none" }}
                      type="file"
                      id="gov_Id"
                    />
                  </ImgInpCon>
                </ImgInpCons>
              </FormGroup>
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: "700",
                  marginLeft: "5px",
                }}
              >
                By clicking finish, you agree with our{" "}
                <a
                  href="#a"
                  style={{ textDecoration: "none", marginLeft: "5px" }}
                >
                  {" "}
                  terms & conditions
                </a>
              </p>

              <BtnsFlex>
                <Next onClick={() => setActiveIndex(activeIndex - 1)}>
                  Prev
                </Next>
                <Next
                  disabled={loading}
                  onClick={() => {
                    
                    logVals(allRefs, id_url, dispatch, navigate, setErrors,setLoading);
                  }}
                >
                  Finish {loading&&<ButtonSpinner/>}
                </Next>
              </BtnsFlex>
            </FormSubCon>
          </FormCon>
        </SubCon>
      </Container>
    </div>
  );
};
export default Register;
