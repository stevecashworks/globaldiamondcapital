import { useEffect, useState } from "react";
import styled from "styled-components";
import { Triangle } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import fetchData from "./fetchData";
import { developmentApiEntryPoint } from "./pages/register";
import { useDispatch, useSelector } from "react-redux";
import { setIsLogged, setUserDetails, selectIsLogged,selectUserDetails } from "./state/slices/userSlice";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const App = () => {
  const userIsLogged = useSelector(selectIsLogged);
  const userDetails=useSelector(selectUserDetails)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [dataFetched, setDataFetched] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    const handleWindowLoad = () => setAssetsLoaded(true);

    // Listen for the window load event
    if (document.readyState === "complete") {
      setAssetsLoaded(true);
    } else {
      window.addEventListener("load", handleWindowLoad);
    }

    return () => {
      window.removeEventListener("load", handleWindowLoad);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("support_token");

    if (!token) {
      navigate("/home");
    } else {
      fetchData(
        `${developmentApiEntryPoint}/users/tklogin`,
        (data) => {
          dispatch(setUserDetails(data.result));
          dispatch(setIsLogged(true));
          setDataFetched(true);
        },
        (message) => {
          alert(message);
          navigate("/home");
        },
        "POST",
        {},
        token
      );
    }
  }, []);

  useEffect(() => {
    if (dataFetched && assetsLoaded) {
      if(userDetails.status!=="approved"){
        alert("Your account awaits approval")
        navigate("/home")

      }
      else{

        navigate((userIsLogged) ? (userDetails.isAdmin?"/admin":"/dashboard") : "/home");
      }
    }
  }, [dataFetched, assetsLoaded, userIsLogged, navigate]);

  return (
    <Container>
      <Triangle
        visible={true}
        height="80"
        width="80"
        color="#16a085"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </Container>
  );
};

export default App;
