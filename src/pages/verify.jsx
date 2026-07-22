import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Triangle } from "react-loader-spinner";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { developmentApiEntryPoint } from "./register"; // adjust path
import "./verify.css";

export default function VerifyEmail() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");

        if (!id) {
          throw new Error("Verification ID is missing.");
        }

        const response = await fetch(
          `${developmentApiEntryPoint}/users/verify/${id}`,
          
        );

        const data = await response.json();
        console.log({data})

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to verify your email."
          );
        }

        setUser(data.user);
        setMessage(
          data.result ||
            "Your email has been verified successfully."
        );

        setSuccess(true);
      } catch (error) {
        setSuccess(false);
        setMessage(
          
            "Something went wrong while verifying your email."
        );
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  /**
   * Loading State
   * Nothing except the Triangle spinner.
   */
  if (loading) {
    return (
      <div className="verify-loading">
        <Triangle
          visible={true}
          height={80}
          width={80}
        />
      </div>
    );
  }

  return (
    <div className="verify-page">

      <div
        className={`verify-card ${
          success ? "success" : "error"
        }`}
      >
        {/* Icon */}

        <div className="verify-icon">

          {success ? (
            <FaCheckCircle />
          ) : (
            <FaTimesCircle />
          )}

        </div>

        {/* Heading */}

        <h2>
          {success
            ? "Email Verified Successfully"
            : "Verification Failed"}
        </h2>

        {/* Personalized Message */}

        {success ? (
          <>
            <p className="welcome-text">
              Dear <strong>{user?.name}</strong>,
            </p>

            <p>{message?message.name:""}</p>

            <p className="sub-text">
              Your email address has been confirmed.
              Your account is now ready to use.
            </p>
          </>
        ) : (
          <>
            <p>{message}</p>

            <p className="sub-text">
              The verification link may have
              expired or is invalid.
            </p>
          </>
        )}

        {/* Button */}

        <button
          className="verify-btn"
          onClick={() => navigate("/login")}
        >
          Continue to Login →
        </button>
      </div>

    </div>
  );
}