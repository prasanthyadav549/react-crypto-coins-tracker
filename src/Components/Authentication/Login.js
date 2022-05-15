import { Box, Button, TextField } from '@material-ui/core';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { CryptoState } from '../../CryptoContext';
import { auth } from '../../firebase';

const Login = ({handleClose}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {setAlert}= CryptoState();

    const handleSubmit = async(e) => {

       
        if(!email || !password){
            setAlert({open:true,message:"Please enter email and password",type:"error"});
            return;
        }
// get the user details from the firebase database using the email
    try {
      // this method is there in docs see the docs for clarification
      console.log(email,password);
        const User = await signInWithEmailAndPassword(auth,email, password);
        console.log(User);
        setAlert({open:true,message:`${User.user.email} is successfully logged in`,type:"success"});
        handleClose();
    }
    catch (error) {
        console.log(error);
        setAlert({open:true,message:error.message,type:"error"});
        return ;


    }
    }



  return (
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
        label="Enter Email"
        type="email"
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

         <Button
          variant="contained"
          size="large"
          style={{ backgroundColor: "#EEBC1D" }}
          onClick={handleSubmit}
        >
          Sign Up
        </Button>




     </Box>
  )
}

export default Login
