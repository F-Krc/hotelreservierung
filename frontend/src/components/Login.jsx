import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

function Login() {
  const { loginUser, logoutUser, isLoggedIn, setIsLoggedIn, loggedInUser } =
    useContext(UserContext);
  

  const initialForm = { email: "", password: "" };
  const [formData, setFormData] = useState(initialForm);
  const [loginError, setLoginError] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogout = () => {
    logoutUser();
    setFormData(initialForm);

    setLoginError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(formData);

      setLoginError("");
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);

      setLoginError("Ungültige E-Mail oder Passwort");
    }
    setFormData(initialForm);
  };

  return (
    <div className="login-container">
      <h2> {isLoggedIn ? "Ausloggen" : "Anmeldung"}</h2>
      {isLoggedIn ? (
        <div>
          <p>Anmeldung erfolgreich! Willkommen {loggedInUser.name}</p>
          <br />
          <button onClick={handleLogout}>Ausloggen</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="username"
          />
          <br />
          <label htmlFor="password">Passwort</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
          />
          <br />
          <button type="submit">Senden</button>
          {loginError && <p className="error-message">{loginError}</p>}
        </form>
      )}
    </div>
  );
}

export default Login;
