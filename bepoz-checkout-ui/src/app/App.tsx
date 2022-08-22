import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import RouteSwitch from "./core/routes/RouteSwitch";

function App() {
  return (
    <BrowserRouter>
      <RouteSwitch />
    </BrowserRouter>
  );
}

export default App;
