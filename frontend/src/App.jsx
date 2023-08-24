import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import React,{useContext} from "react";
import Register from "./components/Register";
import Reservation from "./components/Reservation";
import Login from "./components/Login";
import User from "./components/User";
import { UserContext } from "./context/UserContext";
const App = () => {
  const { isLoggedIn } = useContext(UserContext);
  return (
    <Router>
      <Register />
      <Login />
      {isLoggedIn && <User />}
      <Reservation />
    </Router>
  );
};

export default App;
