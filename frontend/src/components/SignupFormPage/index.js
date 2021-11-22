import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className="registerContainer">
      <div className="whyList">
        <h2>Why create a Rebuildable account?</h2>
        <p>
          Find out exactly what LEGO parts you need to build your favorite MOCs.
          You will gain access to lots of free member-only features to help you
          build and share your LEGO creations.
        </p>
        <ul>
          <li>
            LEGO Collection Manage your thousands of LEGO sets and loose parts{" "}
          </li>
          <li>
            Ad-Free No more display ads for a better browsing experience Prizes
          </li>
          <li>
            Participate in competitions and raffle draws to win LEGO sets!
          </li>
          <li>
            Unlimited Builds Use your entire LEGO collection in your build
            searches{" "}
          </li>
          <li>MOCs Submit and share your custom creations with the world</li>
          <li>
            Buy Parts Utilise our free tools to help you buy LEGO from thousands
            of retailers{" "}
          </li>
          <li>Designers Follow your favorite MOC designers</li>
        </ul>
      </div>
      {/* <h1 className="h1heading">
        {" "}
        <i className="fas fa-users fa-md"> </i> Register
      </h1>
      <div>
        Your username will be visible to others and can be changed later if you
        need to.
      </div> */}
      <form onSubmit={handleSubmit} className="registerForm">
        <h1 className="h1heading">
          {" "}
          <i className="fas fa-users fa-md"> </i> Register
        </h1>
        <div>
          Your username will be visible to others and can be changed later if
          you need to.
        </div>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="Username"
          className="registerFormInput"
        />
        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email address"
          className="registerFormInput"
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
          className="registerFormInput"
        />
        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          placeholder="Confirm password"
          className="registerFormInput"
        />
        <br />
        <button type="submit" className="registerFormBtn">
          <i className="fas fa-check"> </i>Register
        </button>
      </form>
    </div>
  );
}

export default SignupFormPage;
