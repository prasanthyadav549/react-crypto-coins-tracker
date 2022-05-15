  import { Box, Button, createTheme, TextField, ThemeProvider } from '@material-ui/core'
import React, { useState } from 'react'
import { CryptoState } from "../../CryptoContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
  const SignUp = ({handleClose}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const {alert,setAlert}= CryptoState();

    const handleSubmit = async(e) => {
        e.preventDefault();
// here we need to validate the form submitted by the user
// if there is any error we use snackbar to display the error message
// which is similar to toast in chakra UI
if(password!==confirmPassword){
    setAlert({open:true,message:"Password and Confirm Password should be same",type:"error"});
    return;
}

  try {

    // we are creating a new useer in firebase using the createUserWithEmailAndPassword
    // method which is present in firebase/auth module and we are passing the email and password
    // as arguments to this method and we are getting the user object as a response
      
    const result = await createUserWithEmailAndPassword(auth,email, password);
    console.log(result);
    setAlert({open:true,message:`${result.user.email} is successfully registered`,type:"success"});
    // this handleClose method is to close the model which is used to display the
    // login and signup modal
    handleClose();
  }
    catch (error) {
        console.log(error);
        setAlert({open:true,message:error.message,type:"error"});
         return ;
    }
    }


    const darkTheme=createTheme({
        palette: {
            primary:{
                main:"#fff",
            },
            type:"dark",
        },
    });
  
    return (
        <ThemeProvider theme={darkTheme}>
        <Box
        p={3}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <TextField
          variant="outlined"
          type="email"
          label="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          color='secondary'
            required
        />
        <TextField
          variant="outlined"
          label="Enter Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
            color='secondary'
            required
        />
        <TextField
          variant="outlined"
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
            color='secondary'
            required
        />
        <Button
          variant="contained"
          size="large"
          style={{ backgroundColor: "#EEBC1D" }}
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
      </Box>
        </ThemeProvider>
    )
  }
  
  export default SignUp


