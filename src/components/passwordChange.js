import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import "../stylesLogin.css";
export default function PasswordChange(props) {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [loginSuccess, setLoginSuccess] = useState(true);
  const triggerResetEmail = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Password reset email sent");
      setEmail("");
      setLoginSuccess(!loginSuccess);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="HomePage">
      <div className="flip-container">
        <div className="form-wrapper">
          <div className="form-box">
            <h2>Change Password</h2>
            {!loginSuccess && (
              <p className="error-message2">
                Link to change your password has been sent to Your email adress!
              </p>
            )}
            <form action="#">
              <div className="input-box">
                <input
                  placeholder="Enter your Email"
                  name="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                />

                <FaEnvelope className="input-icon" />
              </div>

              <button
                className="Dinko"
                type="submit"
                onClick={triggerResetEmail}
              >
                Send link to change password
              </button>
            </form>

            <div className="login-register" style={{ marginTop: "30px" }}>
              <p>Take me back to </p>
              <button onClick={() => navigate("/")}>Log in Page</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
