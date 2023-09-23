import React from "react";
import "../stylesLogin.css";
import { Link, useNavigate } from "react-router-dom";
export default function CheckEmail() {
  const navigate = useNavigate();
  const doThis = () => {
    navigate("/");
  };

  return (
    <div className="HomePage">
      <div className="flip-container">
        <div className="form-wrapper">
          <div className="form-box">
            <h2>Check Your Email</h2>
            <p>
              Thank you for registering! We've sent a verification link to your
              email address. Please check your email and click the verification
              link to activate your account.
            </p>
            <p>
              If you haven't received the email within a few minutes, please
              check your spam folder.
            </p>
            <p>
              <strong>Note:</strong> You won't be able to log in until you've
              verified your email address.
            </p>
            <h3 className="clickhir" onClick={doThis}>
              Click here to come back to Log in page
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
