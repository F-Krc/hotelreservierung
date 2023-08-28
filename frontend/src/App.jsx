import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { UserContext } from "./context/UserContext";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Reservation from "./components/Reservation";
import Login from "./components/Login";
import User from "./components/User";
import NotFound from "./components/NotFound";

import "./App.css";

const App = () => {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <Router>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          {!isLoggedIn && (
            <NavLink to="/" className="nav-link" activeClassName="active-link">
              Register
            </NavLink>
          )}
          <NavLink
            to="/login"
            className="nav-link"
            activeClassName="active-link"
          >
            Login
          </NavLink>
          {isLoggedIn && (
            <NavLink
              to="/user"
              className="nav-link"
              activeClassName="active-link"
            >
              User
            </NavLink>
          )}
          <NavLink
            to="/reservation"
            className="nav-link"
            activeClassName="active-link"
          >
            Reservation
          </NavLink>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" className="main-container">
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<User />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>

      <Footer />
    </Router>
  );
};

export default App;
