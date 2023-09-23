import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { FaEnvelope, FaLock, FaFacebookSquare } from "react-icons/fa";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth, firestore } from "../config/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(true);
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);

      const user = auth.currentUser; // Get the current user
      console.log(user.emailVerified);
      if (user && user.emailVerified) {
        // User is authenticated and their email is verified
        setEmail("");
        setPassword("");
        navigate("/app");
      } else {
        // User is not authenticated or email is not verified
        console.error(
          "Login error: User is not authenticated or email is not verified",
        );
        setLoginSuccess(false);
        // Reset loginSuccess to true after 3 seconds
        setTimeout(() => {
          setLoginSuccess(true);
        }, 30000);
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginSuccess(false);
      // Reset loginSuccess to true after 3 seconds
      setTimeout(() => {
        setLoginSuccess(true);
      }, 10000);
    }
  };

  const handleFacebookLogin = async (e) => {
    e.preventDefault();
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // The user is now signed in with Facebook
      const user = result.user;
      console.log(user);

      // Check if a Firestore document for the user already exists
      const userRef = doc(firestore, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        // If the document doesn't exist, create it
        await setDoc(userRef, {
          email: user.email,
          uid: user.uid,
          data: {
            nodes: [],
            edges: [],
          },
        });
      }

      // You can navigate to the desired page after successful login
      navigate("/app");
    } catch (error) {
      console.error("Facebook Login error:", error);
      // Handle Facebook login error here
    }
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // The user is now signed in with Google
      const user = result.user;
      console.log(user);

      // Check if a Firestore document for the user already exists
      const userRef = doc(firestore, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        // If the document doesn't exist, create it
        await setDoc(userRef, {
          email: user.email,
          uid: user.uid,
          data: {
            nodes: [],
            edges: [],
          },
        });
      }

      // You can navigate to the desired page after successful login
      navigate("/app");
    } catch (error) {
      console.error("Google Login error:", error);
      // Handle Google login error here
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const forgot = () => {
    navigate("/passwordChange");
  };
  const clearPassword = () => {
    setPassword("");
  };

  useEffect(() => {
    // Reset loginSuccess to true when the component unmounts
    return () => {
      setLoginSuccess(true);
    };
  }, []);

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
          <h2>Log in</h2>
          <form action="#" onSubmit={login}>
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
              <label htmlFor="password">Password</label>
              {password && (
                <button
                  className="visibility-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <RxEyeClosed /> : <RxEyeOpen />}
                </button>
              )}
              <FaLock className="input-icon" />
            </div>
            <div className="remember-forgot">
              <label>
                <input type="checkbox" />
                Remember me
              </label>
              <button onClick={forgot}>Forgot password?</button>
            </div>
            <button type="submit">Log In</button>
            <div className="google-login">
              <button onClick={handleGoogleLogin}>
                Log in with Google
                <FcGoogle style={{ marginLeft: "15px" }} />
              </button>
            </div>
            <div className="facebook-login">
              <button onClick={handleFacebookLogin}>
                Log in with Facebook
                <FaFacebookSquare style={{ marginLeft: "15px" }} />
              </button>
            </div>
          </form>

          {!loginSuccess && (
            <p className="error-message">
              Login failed. Wrong e-mail or password. Please try again. You may
              need to confirm your email if you haven't yet.
            </p>
          )}
          <div className="login-register">
            <p>Don't have an account yet?</p>
            <button onClick={() => props.onFormSwitch("register")}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
