import React, { useState } from "react";
import bgImage from "../img/bg-login.png";
import '../styles/login.css'
const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const { token } = await response.json();
      localStorage.setItem("token", token);

      // Call the onLogin function with the token
      onLogin(token);

      // Clear the form
      setUsername("");
      setPassword("");
      setError(null);

      // Redirect or perform any necessary actions
      // after successful login
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <div className="login">
        <div className="login__content">
          <img className="login__img" src={bgImage} alt="Login image" />

          <form className="login__form" onSubmit={handleFormSubmit}>
            <div>
              <h1 className="login__title">
                <span>Welcome</span> Back
              </h1>

              <p className="login__description">
                Welcome! Please login to continue.
              </p>
            </div>

            <div>
              <div className="login__inputs">
                <div>
                  <label htmlFor="email" className="login__label">Email</label>
                  <input
                    className="login__input"
                    type="text"
                    id="email"
                    placeholder="Enter your email address"
                    value={username}
                    onChange={handleUsernameChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="login__label">Password</label>
                  <div className="login__box">
                    <input
                      className="login__input"
                      type="password"
                      id="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {error && <div className="login__error">{error}</div>}

            <div>
              <div className="login__buttons">
                <button className="login__button" type="submit">Log In</button>
                <button className="login__button login__button-ghost">Sign Up</button>
              </div>

              <a className="login__forgot" href="#">Forgot Password?</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
