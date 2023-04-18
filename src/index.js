import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./reset.css";
import "./index.css";
import App from "./components/App";
import { ChampionProvider } from "./utils/ChampionContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChampionProvider>
        <App />
      </ChampionProvider>
    </BrowserRouter>
  </React.StrictMode>
);
