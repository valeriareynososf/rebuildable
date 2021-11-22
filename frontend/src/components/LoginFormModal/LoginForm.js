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
      <h3>
        Login (or{" "}
        <Link to={`/register`} onClick={redirectClick}>
          Create Account
        </Link>
        )
      </h3>
      <form onSubmit={handleSubmit} className="formLogin">
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        {/* <label>
          Username or Email</label> */}
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
          placeholder="Username or Email address"
        />

        {/* <label>
          Password
          </label> */}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
        />

        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LoginForm;
