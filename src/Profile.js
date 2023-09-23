import React from "react";
import { auth } from "./config/firebase";

import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

const Profile = () => {
  const navigate = useNavigate(); // Create a history object
  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
    console.log(auth?.currentUser?.email);
  };

  return (
    <div>
      <h1>ProfilePage</h1>
      {/* <Link to="/app">Go to AppWithProvider</Link> */}
      <div>
        <input />
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;
