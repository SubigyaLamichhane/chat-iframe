import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { APIProvider } from "@vis.gl/react-google-maps";

const API_KEY = "AIzaSyBYZ1Up9YS1UP8DfSpOXAzecX-kVxWgdyA";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <APIProvider
      apiKey={API_KEY}
      solutionChannel="GMP_devsite_samples_v3_rgmautocomplete"
    >
      <App />
    </APIProvider>
  </React.StrictMode>
);
