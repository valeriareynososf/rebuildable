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
        <button onClick={demonLogin}>demo login</button>
      </>
    );
  }

  return (
    <nav className="navcontainer">
    <ul>
      <li>
        <NavLink exact to="/">
          Home
        </NavLink>
        <button onClick={() => setShowModal(true)}>Submit a MOC</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <AddMOC setShowModal={setShowModal}/>
          </Modal>
        )}
        {isLoaded && sessionLinks}
      </li>
    </ul>
    </nav>
  );
}

export default Navigation;
