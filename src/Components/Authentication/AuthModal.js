import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { AppBar, Box, Button, Tab, Tabs } from '@material-ui/core';
import Login from './Login';
import SignUp from './SignUp';
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import { CryptoState } from '../../CryptoContext';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width:400,
    backgroundColor: theme.palette.background.paper,
    color:"white",
    borderRadius: 10,
    
  },
  google: {
    padding: 24,
    paddingTop: 0,
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    gap: 20,
    fontSize: 20,
  },
}));

export default function AuthModel() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const {setAlert}  = CryptoState();
    const googleProvider = new GoogleAuthProvider();


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    
  const signInWithGoogle = () => {
    // using google signin as popup it as takes a call to show what ever the result we get with this method

    signInWithPopup(auth,googleProvider,
    ).then(result => {
     
      setAlert({
        open: true,
        message:`sign up successfull. Welcome ${result.user.displayName}`,
        type:"success",
      })
      handleClose();

    }
    )
    .catch(error => {
      setAlert({
        open: true,
        message:error.message,
        type:"error",
      })
    })
    return ;

  }

  return (
    <div>
      <Button variant="contained"  onClick={handleOpen}
        style={{
          width: 85,
          height:40,
          backgroundColor: '#EEBC1D',
        }}
      >
       Login
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            
            <AppBar position="static">
  <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
    <Tab label="Login" />
    <Tab label="Sign up"  />
    
  </Tabs>
</AppBar>
      
      {/* whenever the value is 0 display the login component and when the value is 1 display the sign up component
      the value is 1 display the sign up component
              */}

              {/* when ever we click the login button in the login page it needs to be closed so we need to close the modal
              send the handleClose as a props to the login component and sign up component */}

              {value === 0 ? (<Login handleClose={handleClose}/>) : (<SignUp  handleClose={handleClose} />)}
                <Box  className={classes.google}>
                  <span>
                    OR
                  </span>
                  <GoogleButton
                style={{ width: "100%", outline: "none" }}
                onClick={signInWithGoogle}
              />
                </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
