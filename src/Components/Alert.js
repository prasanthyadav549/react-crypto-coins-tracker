import React from 'react'
import { CryptoState } from '../CryptoContext';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from "@material-ui/lab/Alert";
function Alert() {


   
    
    const {alert,setAlert} = CryptoState();


     // to open and there are handleOpen and handleClose in the Documentation
    
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setAlert({open:false});
      };
  return (
    <Snackbar
    open={alert.open}
    autoHideDuration={6000}
    onClose={handleClose}
    >
      <MuiAlert 
      severity={alert.type}
      elevation={10}
        variant="filled"
        onClose={handleClose}
      >{alert.message}</MuiAlert>

    </Snackbar>
  )
}

export default Alert
