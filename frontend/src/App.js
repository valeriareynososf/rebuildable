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
import About from "./components/Navigation/About";
import SignupFormPage from './components/SignupFormPage/index';
import { Modal } from './context/Modal';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {/* <button onClick={() => setShowModal(true)} className="homepagebtn">Modal</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h1>About??</h1>
        </Modal>
      )} */}
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/about" exact>
            <About />
          </Route>
          <Route path="/register" exact>
            <SignupFormPage />
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
          <Route path="/comments/:commentId" exact>
            <EditComment />
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
        </Switch>
      )}
    </>
  );
}

export default App;
