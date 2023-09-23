import React, { useState } from "react";
import { auth, firestore } from "../config/firebase";
import {
  sendEmailVerification,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function Resend() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);

  const handleResendEmail = async () => {
    try {
      // Check if the email is associated with an existing user in Firestore
      const userRef = doc(firestore, "users", email);
      const userDoc = await getDoc(userRef);
      console.log(userDoc);

      if (userDoc.exists()) {
        // Create a temporary user to send the verification email
        const tempPassword = Math.random().toString(36).substring(7); // Temporary password
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          tempPassword,
        );

        // Send the verification email
        await sendEmailVerification(auth.currentUser);

        setMessage("Verification email has been resent successfully.");
      } else {
        console.log("User not found in Firestore:", email);
        setMessage("No user with this email found in the database.");
      }
    } catch (error) {
      setMessage("Error sending verification email. Please try again.");
      console.error("Resend Email error:", error);
    }
  };

  return (
    <div>
      <h2>Resend Verification Email</h2>
      <p>
        Enter your email below to request the resend of the verification email.
      </p>
      <div>
        <label>Email:</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button onClick={handleResendEmail}>Resend Verification Email</button>
      {message && <p>{message}</p>}
    </div>
  );
}
