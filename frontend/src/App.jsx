import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import React from "react";
import Register from "./components/Register";
import Reservation from "./components/Reservation";
import Login from "./components/Login";
import User from "./components/User";
const App = () => {
  return (
    <Router>
      <Register />
      <Login />
      <User />
      <Reservation />
    </Router>
  );
};

export default App;
