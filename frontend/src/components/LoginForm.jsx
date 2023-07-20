import React, { useState } from "react";
import bgImage from "../img/bg-login.png";
import '../styles/login.css'

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [signupSuccess, setSignupSuccess] = useState(false); // State to track signup success

  const handleUsernameChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
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
      setEmail("");
      setPassword("");
      setError(null);

      // Redirect or perform any necessary actions
      // after successful login
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignupSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      setSignupSuccess(true); // Set signup success state to true

      // Clear the form
      setEmail("");
      setPassword("");
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className=" bg-main-body bg-main">
    <div className="container">
      <div className="login">
        <div className="login__content">
          <img className="login__img" src={bgImage} alt="Login image" />

          <form className="login__form">
            <div>
              <h1 className="login__title">
                <span>Welcome</span> to TrimTrends
              </h1>
            </div>

            <div>
              <div className="login__inputs">
                <div>
                  <label htmlFor="email" className="login__label">Email</label>
                  <input
                    className="login__input"
                    type="email"
                    id="email"
                    placeholder="Enter your email address"
                    value={email}
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
                <button className="login__button" type="submit" onClick={handleLoginSubmit}>Log In</button>
                <button className="login__button login__button-ghost" type="submit" onClick={handleSignupSubmit}>Sign Up</button>
              </div>

              <a className="login__forgot" href="#">Forgot Password?</a>
            </div>

            {signupSuccess && (
              <div className="login__success">
                Signup successful! Please login to continue.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default LoginForm;
