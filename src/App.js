
import './App.css';
import React, { Suspense, lazy } from "react";

import {BrowserRouter as Router,Route, Routes} from 'react-router-dom';
import {Header} from './Components';
// import {Home,Coin} from './Pages';
import { makeStyles } from '@material-ui/core';
import Alert from './Components/Alert';
import GoogleTranslate from './Components/GoogleTranslate';
const Home = React.lazy(() => import('./Pages/Home'));
const Coin = React.lazy(() => import('./Pages/Coin'));
function App() {
  const useStyles=makeStyles(()=>({
      App:{
        backgroundColor: '#14161a',
        color:"white",
        minHeight:'100vh',
      }
  }));
  const classes=useStyles();
  return (
   <Router>
     <div className={classes.App}>
         <Header/>
         <GoogleTranslate /> 
         <Suspense fallback={<div>Loading...</div>}>
         <Routes>
        
           <Route path="/" element={<Home/>}/>
           <Route path="/coins/:id" element={<Coin/>}/>
        
         </Routes>
         </Suspense>
         <Alert/>
     </div>
   </Router>
  );
}

export default App;
