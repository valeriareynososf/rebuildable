import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./LoginForm.css";

function LoginForm({setShowModal}) {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };
 const redirectClick = (e) => {
   setShowModal(false);
 };
  return (
    <div className="loginModalContainer">
      <form onSubmit={handleSubmit} className="formLogin">
        <div className="h3login">
          Login (or{" "}
          <Link
            to={`/register`}
            onClick={redirectClick}
            className="createAccountLink"
          >
            Create Account
          </Link>
          )
        </div>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
          placeholder="Username or Email address"
          className="inputLoginModal"
        />
        <span className="loginLabelModal">
          <i className="fas fa-envelope"></i>
        </span>
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
          className="inputLoginModal"
        />
        <span className="loginLabelModal">
          <i className="fas fa-lock"></i>
        </span>
        <br />
        <button
          type="submit"
          className="loginModalBtn"
          disabled={errors.length > 0}
        >
          <i className="fas fa-check"></i> Log In
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
