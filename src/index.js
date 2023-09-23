import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppWithProvider from "./App";
import "reactflow/dist/style.css";
import "./styles.css";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Router>
      <Routes />
    </Router>
  </StrictMode>
);
