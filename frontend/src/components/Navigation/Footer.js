import {
  BottomNavigationAction,
  BottomNavigation,
  Box
} from '@mui/material';

function Footer() {

  return (
    <Box sx={{ flexGrow: 1, marginLeft: "120px", marginRight:"120px" }}>
    <BottomNavigation
    showLabels
    sx={{backgroundColor:'#333333'}}
  >
    <a
        href="https://github.com/valeriareynososf"
        target="_blank"
      >
    <BottomNavigationAction sx={{color: 'white', fontSize:'20px', paddingLeft:'0px', paddingRight:'0px'}} label="Github" icon={<i className="fab fa-github"></i>} />
    </a>
    <BottomNavigationAction sx={{color: 'white', paddingLeft:'0px', paddingRight:'0px'}} label="Valeria Reynoso" />
    <a
        href="https://www.linkedin.com/in/valeria-reynoso-b89210149/"
        target="_blank"
      >
        <BottomNavigationAction sx={{color: 'white', fontSize:'20px', paddingLeft:'0px', paddingRight:'0px'}}  label="Linked In" icon={<i className="fab fa-linkedin"></i>} />
      </a>

  </BottomNavigation>
  </Box>
    // <div className="footerContainer">
    //   <a
    //     href="https://github.com/valeriareynososf"
    //     target="_blank"
    //     className="linkedInLink"
    //   >
    //     <i className="fab fa-github"></i>
    //   </a>{" "}
    //   Valeria Reynoso{" "}
    //   <a
    //     href="https://www.linkedin.com/in/valeria-reynoso-b89210149/"
    //     target="_blank"
    //     className="linkedInLink"
    //   >
    //     <i className="fab fa-linkedin"></i>
    //   </a>
    // </div>
  );
}

export default Footer;
