import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import AppWithProvider from "./App";
import Profile from "./Profile";
import Resend from "./components/Resend";
import CheckEmail from "./components/check-email";
import PasswordChange from "./components/passwordChange";
import Tutorial from "./components/Tutorial";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/app" element={<AppWithProvider />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/check-email" element={<CheckEmail />} />
      <Route path="/passwordChange" element={<PasswordChange />} />
      <Route path="/tutorial" element={<Tutorial />} />
      {/* <Route path="/resendEmail" element={<Resend />} /> */}
    </Routes>
  );
}

export default AppRoutes;
