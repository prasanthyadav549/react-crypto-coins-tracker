import React from 'react'
import { AppBar,  Container, createTheme, makeStyles, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';


const useStyles =makeStyles({
    root: {
        color: 'gold',
        fontWeight: 'bold',
        cursor: 'pointer',
         flex: 1,
    }
});



function Header() {
    const darkTheme=createTheme({
        palette: {
            primary:{
                main:"#fff",
            },
            type:"dark",
        },
    });
    const classes = useStyles();
    let navigate=useNavigate();
    const {currency ,setCurrency }=CryptoState();
   
    return (
       <ThemeProvider theme={darkTheme}>
          <AppBar position="static" color="transparent">
          <Container>
            <Toolbar>
                <Typography className={classes.root} onClick={()=>navigate("/")}>Crypto Hunter </Typography>
                  <Select variant="outlined"  value={currency} onChange={(e)=>setCurrency(e.target.value)} >
                  <MenuItem value={"USD"}>USD</MenuItem>
                  <MenuItem value={"INR"}>INR</MenuItem>
                  </Select>
                 

            </Toolbar>
            </Container>
          </AppBar>
          </ThemeProvider>
    )
}

export default Header
