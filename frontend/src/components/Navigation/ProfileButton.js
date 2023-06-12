import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { Link} from "react-router-dom";
import "./Navigation.css";
import { 
  Toolbar,
  AppBar,
  Box,
  InputAdornment,
  Stack,
  Button,
  Typography
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <Button onClick={openMenu} sx={{ color:"#FFFFFF", fontSize:"12px",'&:hover': {
      backgroundColor: '#7EA92F',
  }
  }} > 
     <Stack>
       <i className="fas fa-user fa-lg"><KeyboardArrowDownIcon fontSize='12px'/></i>
        <Typography variant="caption" gutterBottom>ACCOUNT</Typography> 
     </Stack>
   
  </Button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>Profile</li>
          <hr />
          <li>
            <Link key={user.id} to={`/users/${user.id}`} className="profileLink">
              Profile
            </Link>
          </li>
          <li>
            <button onClick={logout} className="logoutBtn">
              {" "}
              <i class="fas fa-power-off"></i>Log Out {user.username}
            </button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
