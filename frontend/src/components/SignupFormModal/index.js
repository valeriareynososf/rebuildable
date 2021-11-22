import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import SignupForm from "./SignUpForm";
// import "./LoginForm.css" from

function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)} className="registerBtn">
        REGISTER
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;
