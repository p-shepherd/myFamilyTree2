import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import "./stylesLogin.css";

export default function HomePage() {
  const [currentForm, setCurrentForm] = useState("login");

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  return (
    <div className="HomePage">
      {/* backdrop-filter doesn't work with 3d transform */}
      {/* {currentForm === "login" ? (
        <Login onFormSwitch={toggleForm} />
      ) : (
        <Register onFormSwitch={toggleForm} />
      )} */}

      <div className="flip-container">
        <div className={`flipper ${currentForm === "login" ? "" : "flip"}`}>
          <div className="front">
            <Login onFormSwitch={toggleForm} />
          </div>
          <div className="back">
            <Register onFormSwitch={toggleForm} />
          </div>
        </div>
      </div>
    </div>
  );
}
