import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

const root = createRoot(document.getElementById("root")).render(
  <div className="My_App">
    <App />
  </div>
);
