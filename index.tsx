// index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // keep if you have index.css at repo root (create it if not)
import App from "./App";
import { AppProvider } from "./AppContext";
import { ThemeProvider } from "./ThemeContext";
import { ToastProvider } from "./ToastContext";

// ensure a root element exists (safe for different index.html setups)
const container =
  document.getElementById("root") ||
  document.body.appendChild(document.createElement("div"));
container.id = "root";

const root = ReactDOM.createRoot(container as HTMLElement);

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </ToastProvider>
    </ThemeProvider>
  </React.StrictMode>
);
