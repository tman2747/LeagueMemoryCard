import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MemoryCard from "./MemoryCard.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MemoryCard />
  </StrictMode>
);
