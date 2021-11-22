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
        <p className="whyParagraph">
          Find out exactly what LEGO parts you need to build your favorite MOCs.
          You will gain access to lots of free member-only features to help you
          build and share your LEGO creations.
        </p>
        <ul>
          <li className="listofWhy">
            <i className="fas fa-puzzle-piece fa-lg"></i>{" "}
            <span className="boldList">LEGO Collection</span> Manage your
            thousands of LEGO sets and loose parts{" "}
          </li>
          <li className="listofWhy">
            <i className="fas fa-fire fa-lg"> </i>{" "}
            <span className="boldList">Ad-Free</span> No more display ads for a
            better browsing experience Prizes
          </li>
          <li className="listofWhy">
            <i className="fas fa-trophy fa-lg"> </i>{" "}
            <span className="boldList">Prizes </span>Participate in competitions
            and raffle draws to win LEGO sets!
          </li>
          <li className="listofWhy">
            <i className="fas fa-gavel fa-lg"> </i>{" "}
            <span className="boldList">Unlimited Builds</span> Use your entire
            LEGO collection in your build searches{" "}
          </li>
          <li className="listofWhy">
            <i className="fas fa-rocket registerRocket fa-lg"></i>{" "}
            <span className="boldList">MOCs</span> Submit and share your custom
            creations with the world
          </li>
          <li className="listofWhy">
            <i className="far fa-money-bill-alt fa-lg"></i>{" "}
            <span className="boldList">Buy Parts</span> Utilise our free tools
            to help you buy LEGO from thousands of retailers{" "}
          </li>
          <li className="listofWhy">
            <i className="fas fa-user-plus fa-lg"> </i>{" "}
            <span className="boldList">Designers</span> Follow your favorite MOC
            designers
          </li>
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
        {/* <label>Username</label> */}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="Username"
          className="registerFormInput"
        />
        {/* <label>Email</label> */}
        <br />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email address"
          className="registerFormInput"
        />
        {/* <label>Password</label> */}
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
          className="registerFormInput"
        />
        {/* <label>Confirm Password</label> */}
        <br />
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
