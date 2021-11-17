import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { singleUser } from "../../store/singleuser";
import { getUser } from "../../store/users";

function ProfilePage() {
    const dispatch = useDispatch();
    const { userid } = useParams();
    console.log("params", userid)
const user = useSelector((state) => state.singleReducer.main);
//const users = useSelector((store) => store.userReducer?.users);

    useEffect(() => {
      dispatch(singleUser(userid));
      //dispatch(getUser());
    //   if (user.id) {
    //     dispatch(artistsSongs(user.id));
    //   }
    }, [dispatch, userid]);
console.log("is this user?", user)
  return (
    <div>
      <h2>hola</h2>
      {user.username}
      {/* {users !== null ? (
        <>
          {Object.values(users).map((user) => (
            <span key={user.id}>
              {userId === user.id ? (
                  <>
           
                  {user.username}
                
                </>
              ) : null}
            </span>
          ))}
        </>
      ) : null} */}
    </div>
  );
}

export default ProfilePage;
