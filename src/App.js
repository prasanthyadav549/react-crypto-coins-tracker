
import './App.css';
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom';
import {Header} from './Components';
import {Home,Coin} from './Pages';
import { makeStyles } from '@material-ui/core';
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
         <Routes>
           <Route path="/" element={<Home/>}/>
           <Route path="/coins/:id" element={<Coin/>}/>
         </Routes>
     </div>
   </Router>
  );
}

export default App;
