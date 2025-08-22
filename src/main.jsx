import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import StarlightField from "./StarlightField.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StarlightField />
  </StrictMode>
);
