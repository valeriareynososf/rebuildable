import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import AddMOC from "../Navigation/AddMOC"
import { Modal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./Navigation.css";
import Rebuildable from "../../images/Rebuildable.png";
import SearchResults from "../Navigation/Search.js"
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { 
        Toolbar,
        AppBar,
        Box,
        InputAdornment,
        Stack,
        Button,
        Typography
} from '@mui/material';


function Navigation({ isLoaded }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [searchValues, setSearchValues] = useState(false);

  const demonLogin = async () => {
    setCredential("demo@user.io");
    setPassword("password");
    return dispatch(
      sessionActions.login({ credential: "demo@user.io", password: "password" })
    );
  };

useEffect(() => {
  if (search.length) {
    setSearchValues(true);
  } else {
    setSearchValues(false);
  }
}, [search]);

const inputFunction = () => {
if (search.length) {
  setSearchValues(true);
} else {
  setSearchValues(false);
}
}

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <Link to={`/register`} className="registerBtn">
          REGISTER
        </Link>
        <button onClick={demonLogin} className="demoBtn">
          DEMO LOGIN
        </button>
      </>
    );
  }
const searchFunction = (e) => {
e.stopPropagation();
setSearch("");
}

  return (
    <>
  <Box sx={{ flexGrow: 1, marginLeft: "120px", marginRight:"120px" }}>
    <AppBar position="sticky" sx={{backgroundColor:"#333333"}}>
    <Toolbar>
   
    <NavLink exact to="/" className="homeLink">
          <img src={Rebuildable} alt="lego" className="homebLogo" />
        </NavLink>
     
        <span onClick={searchFunction}>
          <TextField
          variant="outlined" 
          id="outlined-basic"
          placeholder="Search..."
          margin="dense"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ m: 1, backgroundColor: '#FFFFFF',borderRadius: '5px' }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>
          }}
        />
          {searchValues && (
            <SearchResults
              search={search}
              setSearchValues={setSearchValues}
              setSearch={setSearch}
            />
          )}
        </span>
         <Box sx={{ flexGrow: 1 }} />
       <Box sx={{ display: { xs: 'flex', md: 'flex' }, marginRight:'50px' }}>
       
         <NavLink exact to="/about" className="aboutLink">     
          <Button sx={{ color:"#FFFFFF", fontSize:"12px",'&:hover': {
      backgroundColor: '#7EA92F',
  }
  }} > 
       <Stack>
               <i className="fas fa-user fa-lg"><KeyboardArrowDownIcon fontSize='12px'/></i>
               <Typography variant="caption" gutterBottom>ABOUT</Typography> 
            </Stack>
          </Button>
         </NavLink>    

         <Button sx={{color:"#FFFFFF", fontSize:"12px",'&:hover': { 
          backgroundColor: '#7EA92F',
        }}} onClick={() => setShowModal(true)} >
          <Stack>
          <i className="fas fa-rocket fa-lg"><KeyboardArrowDownIcon fontSize='12px'/></i>
               <Typography variant="caption" gutterBottom>MOCs</Typography> 
          </Stack>
          </Button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <AddMOC setShowModal={setShowModal} />
            </Modal>
          )}
          {isLoaded && sessionLinks}  
        </Box>
        </Toolbar>
      </AppBar>
  </Box>
    </>
  );
}

export default Navigation;
