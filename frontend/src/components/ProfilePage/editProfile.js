import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editUser } from "../../store/singleUser";
import "./profile.css";

function EditProfile({ user, setShowModal }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(user.email);
  const [imgUrl, setImgUrl] = useState(user.imgUrl);
  const [username, setUsername] = useState(user.username);
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(false);
    window.location.reload();
    return dispatch(editUser({ email, imgUrl, username }, user.id));
  };

 useEffect(() => {
   const errors = [];
   if (!email) errors.push("Email field is required");
   if (!imgUrl) errors.push("A url to the image is required");
   if (!username) errors.push("Username field is required");
   setErrors(errors);
 }, [email, imgUrl, username]);

  return (
    <div className="editProfileDiv">
      <form onSubmit={handleSubmit} className="editProfileForm">
        <div className="editProTitle">
          <i className="fas fa-info-circle"></i> Edit your Profile
        </div>
        {/* <ul>
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul> */}
        <label>Email</label>
        <br />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="inputForm"
        />
        <br />
        <label>Username</label>
        <br />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="inputForm"
        />
        <br />
        <label className="editLabelPro">Profle Image</label>
        <br />
        <input
          type="text"
          placeholder="image url"
          value={imgUrl}
          onChange={(e) => setImgUrl(e.target.value)}
          className="inputForm"
        />
        <br />
        <button
          type="submit"
          disabled={errors.length > 0}
          className="updateProfileBtn"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
