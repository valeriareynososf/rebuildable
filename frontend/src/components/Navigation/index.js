import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import AddMOC from "../Navigation/AddMOC"
import { Modal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
   const [showModal, setShowModal] = useState(false);

  const demonLogin = async () => {
    setCredential("demo@user.io");
    setPassword("password");
    return dispatch(
      sessionActions.login({ credential: "demo@user.io", password: "password" })
    );
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignupFormModal />
        <button onClick={demonLogin} className="demoBtn">demo login</button>
      </>
    );
  }

  return (
    <nav>
      {/* <NavLink exact to="/">
          Home
        </NavLink> */}
      <nav className="navcontainer">
        {/* <ul> */}
        {/* <nav> */}
        <NavLink exact to="/" className="homeLink">
          Home
        </NavLink>
        <nav className="navlinks">
          <button onClick={() => setShowModal(true)} className="MOCBtn">
            <i className="fas fa-rocket fa-lg"> ˅ </i>
            <div>MOCs</div>
          </button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <AddMOC setShowModal={setShowModal} />
            </Modal>
          )}
          {isLoaded && sessionLinks}
        </nav>
        {/* </nav> */}
        {/* </ul> */}
      </nav>
    </nav>
  );
}

export default Navigation;
