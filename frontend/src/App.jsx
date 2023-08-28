import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import React, { useContext } from "react";
import Register from "./components/Register";
import Reservation from "./components/Reservation";
import Login from "./components/Login";
import User from "./components/User";
import NotFound from "./components/NotFound";
import { UserContext } from "./context/UserContext";
import Footer from "./components/Footer";
const App = () => {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <Router>
    <nav className="navbar">
        <NavLink to="register" ></NavLink>
        {!isLoggedIn && <NavLink to="/" >
          Register
        </NavLink>}
        <NavLink to="login" >
          Login
        </NavLink>
        {isLoggedIn && <NavLink to="user" >
          User
        </NavLink>}
        <NavLink to="reservation" >
          Reservation
        </NavLink>  
        </nav>
 
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<User />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
