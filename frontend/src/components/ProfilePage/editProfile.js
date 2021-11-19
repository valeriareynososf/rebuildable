import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editUser } from "../../store/singleUser";

function EditProfile({ user, setShowModal }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(user.email);
  const [imgUrl, setImgUrl] = useState(user.imgUrl);
  const [username, setUsername] = useState(user.username);
  // const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(false);
    window.location.reload();
    return dispatch(editUser({ email, imgUrl, username }, user.id));
  };

  return (
    <form onSubmit={handleSubmit}>
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
      />
      <br />
      <label>Username</label>
      <br />
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <label>Profle Image</label>
      <br />
      <input
        type="text"
        placeholder="image url"
        value={imgUrl}
        onChange={(e) => setImgUrl(e.target.value)}
      />
      <br />
      <button type="submit">
        Update Profile
      </button>
    </form>
  );
}

export default EditProfile;
