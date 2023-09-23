import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./config/firebase";
import {
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";
import { useState } from "react";

const HomePage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Create a history object
  console.log(auth?.currentUser?.email);

  

  return (
    <div>
      <h1>Home Page</h1>
      <h2>Register</h2>

      <input
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={register}>Submit</button>
      <button onClick={logout}>Logout</button>
      {/* sasas */}
      <h2>Login</h2>
      <p>Email</p>
      <input placeholder="E-mail" />
      <p>Password:</p>
      <input placeholder="password " />
      <button>Submit</button>
      {/* <Link to="/app">Go to AppWithProvider</Link> */}
    </div>
  );
};

export default HomePage;
