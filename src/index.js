import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Coin from "./routes/Coin";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="coin/:name" element={<Coin />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);

