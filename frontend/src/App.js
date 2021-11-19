import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
// import SignupFormPage from './components/SignupFormPage';
// import LoginFormPage from "./components/LoginFormPage";
import HomePage from "./components/HomePage";
import PostPage from "./components/HomePage/PostPage";
import ProfilePage from "./components/ProfilePage/index"
import UpdateBuild from './components/ProfilePage/UpdateMOC';
import EditComment from './components/HomePage/EditComment';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
// import { Modal } from './context/Modal';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  // const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {/* <button onClick={() => setShowModal(true)}>Modal</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h1>Hello I am a Modal</h1>
        </Modal>
      )} */}
      {isLoaded && (
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/posts/:postId" exact>
            <PostPage />
          </Route>
          <Route path="/users/:userid" exact>
            <ProfilePage />
          </Route>
          <Route path="/posts/:postId/edit" exact>
            <UpdateBuild />
          </Route>
          <Route path="/">
            <h2
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              Page Not Found
            </h2>
          </Route>
          <Route path="/posts/:postId/comment/:commentId" exact>
            <EditComment />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
