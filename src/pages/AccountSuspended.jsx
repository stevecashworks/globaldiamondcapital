import styled from "styled-components";
import {
  FaShieldAlt,
  FaEnvelope,
  FaArrowLeft,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Page = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a, #1e293b, #111827);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  overflow: hidden;
  position: relative;

  &:before,
  &:after {
    content: "";
    position: absolute;
    border-radius: 50%;
    filter: blur(90px);
    opacity: 0.35;
  }

  &:before {
    width: 350px;
    height: 350px;
    background: #dc3545;
    top: -120px;
    right: -120px;
  }

  &:after {
    width: 300px;
    height: 300px;
    background: #ffc107;
    bottom: -100px;
    left: -100px;
  }
`;

const Card = styled.div`
  max-width: 700px;
  width: 100%;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(18px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  color: white;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.45);
  position: relative;
  z-index: 2;
`;

const IconCircle = styled.div`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background: rgba(220, 53, 69, 0.12);
  border: 1px solid rgba(220, 53, 69, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
`;

const InfoBox = styled.div`
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-left: 4px solid #ffc107;
  border-radius: 16px;
`;

const Footer = styled.div`
  color: rgba(255, 255, 255, 0.55);
  font-size: 0.9rem;
`;

export default function AccountSuspended({
  reason = "Your account has been suspended after our security system detected activity that requires further review.",
  

})
 {
const navigate = useNavigate();
    const onLogout=()=>{
        localStorage.removeItem("support_token")
        navigate("/")
    }
  return (
    <Page>
      <Card className="p-5">

        <IconCircle>
          <FaShieldAlt size={48} className="text-danger" />
        </IconCircle>

        <h1 className="fw-bold text-center mt-4">
          Account Suspended
        </h1>

        <p
          className="text-center text-light opacity-75 mx-auto mt-3"
          style={{ maxWidth: 520 }}
        >
          {reason}
        </p>

        <InfoBox className="p-4 mt-5">

          <div className="d-flex align-items-center mb-3">
            <FaExclamationTriangle
              className="text-warning me-2"
              size={20}
            />
            <h5 className="mb-0 fw-semibold">
              What this means
            </h5>
          </div>

          <ul className="mb-0 text-light opacity-75">
            <li>Your account has been temporarily disabled.</li>
            <li>Your information remains safe and secure.</li>
            <li>
              You won't be able to access platform features until the
              suspension is resolved.
            </li>
            <li>
              If you believe this action was taken in error, please contact
              our support team.
            </li>
          </ul>

        </InfoBox>

        <div className="row g-3 mt-4">

          <div className="col-md-6">
            {/* <button
              className="btn btn-danger w-100 py-3 fw-semibold"
              onClick={onContactSupport}
            >
              <FaEnvelope className="me-2" />
              Contact Support
            </button> */}
          </div>

          <div className="col-md-6">
            <button
              className="btn btn-outline-light w-100 py-3 fw-semibold"
              onClick={onLogout}
            >
              <FaArrowLeft className="me-2" />
              Log out
            </button>
          </div>

        </div>

        <hr className="border-secondary my-5" />

        <Footer className="text-center">
          If your suspension is temporary, access will automatically be
          restored once the review period has ended. Thank you for your
          patience and understanding.
        </Footer>

      </Card>
    </Page>
  );
}