import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import React from "react";
import Register from "./components/Register";
import Reservation from "./components/Reservation";


const App = () => {
  return (
    <Router>
      <Register />
      <Reservation />
    </Router>
  );
};

export default App;
