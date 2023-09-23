import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { firestore } from "../config/firebase"; // Import Firestore from your Firebase config file
import { doc, setDoc } from "firebase/firestore";
import ReCAPTCHA from "react-google-recaptcha";
import {
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  sendEmailVerification,
} from "firebase/auth";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";

export default function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordR, setPasswordR] = useState("");
  const [wrong, setWrong] = useState(false);
  const navigate = useNavigate();
  const [captchaValue, setCaptchaValue] = useState(null);

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const register = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    if (password === passwordR && captchaValue) {
      try {
        // Create the user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        const user = userCredential.user;

        // Send email verification
        await sendEmailVerification(user);

        // Create a document in Firestore for the user
        const userRef = doc(firestore, "users", user.uid);
        await setDoc(userRef, {
          email: user.email,
          uid: user.uid,
          data: {
            nodes: [],
            edges: [],
          },
        });

        setEmail("");
        setPassword("");

        // After successful registration and email sent, redirect to a page informing the user to check their email
        navigate("/check-email");
      } catch (error) {
        console.error("Registration error:", error);
      }
    } else {
      setWrong(true);
      setPassword("");
      setPasswordR("");
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordR, setShowPasswordR] = useState(false);
  // const isEmailVerified = auth.currentUser && auth.currentUser.emailVerified;

  return (
    <div>
      <div className="image-container">
        <img
          src="https://svgur.com/i/xtR.svg"
          style={{
            padding: "0px",
            margin: "0px",
            width: "95%",
            display: "flex",
            alignItems: "center",

            marginBottom: "15px",
          }}
          alt="Image"
        />
      </div>
      <div className="form-wrapper">
        <div className="form-box">
          {wrong ? (
            <p className="error-message">
              Your passwords don't match <br />
              or you didn't resolve the captcha.
            </p>
          ) : (
            <p></p>
          )}
          {/* {isEmailVerified ? (
            <p>Email is verified. You can now log in.</p>
          ) : (
            <p>
              Please check your email to verify your account. If you haven't
              received the verification email, you can{" "}
              <a href="/resendEmail">request a new one</a>
            </p>
          )} */}
          <h2>Register</h2>
          <form action="#" onSubmit={register}>
            <div className="input-box">
              <input
                placeholder=""
                value={email}
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email">Email</label>
              <FaEnvelope className="input-icon" />
            </div>
            <div className="input-box">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                autoComplete="off"
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password">Password</label>
              <FaLock className="input-icon" />
              {password && (
                <button
                  className="visibility-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {" "}
                  {showPassword ? <RxEyeClosed /> : <RxEyeOpen />}{" "}
                </button>
              )}
            </div>
            <div className="input-box">
              <input
                type={showPasswordR ? "text" : "password"}
                id="password"
                name="password"
                autoComplete="off"
                placeholder=""
                value={passwordR}
                onChange={(e) => setPasswordR(e.target.value)}
              />
              <label htmlFor="password">Repeat Password</label>
              <FaLock className="input-icon" />
              {passwordR && (
                <button
                  className="visibility-btn"
                  onClick={() => setShowPasswordR(!showPasswordR)}
                >
                  {" "}
                  {showPasswordR ? <RxEyeClosed /> : <RxEyeOpen />}{" "}
                </button>
              )}
            </div>

            <ReCAPTCHA
              style={{ marginBottom: "20px", padding: 0 }}
              sitekey="6Lck_I8oAAAAAL3Hz6O5hjOHUROCuyva2jTmL27u" // Replace with your reCAPTCHA Site Key
              onChange={handleCaptchaChange}
            />
            <button type="submit">Register</button>
          </form>
          <div className="login-register">
            <p>Already have an account?</p>
            <button onClick={() => props.onFormSwitch("login")}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}
