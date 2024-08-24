import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./app.tsx";
import { TripProvider } from "./contexts/tripContext.tsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TripProvider>
      <App />
    </TripProvider>
  </React.StrictMode>
);
