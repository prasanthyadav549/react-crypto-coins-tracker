import { Container, makeStyles, Typography } from '@material-ui/core';
import axios from 'axios';


import React, { useEffect, useState } from 'react';
import { CryptoState } from '../../CryptoContext';
import Carousel from './Carousel';

const useStyles= makeStyles(()=>({
    banner: {
        backgroundImage:"url(./banner2.jpg)",
    },
    bannerContent :{
        
        display:"flex",
        flexDirection: "column",
        paddingTop: 15,
        justifyContent: "space-around",
    },
    tagline:{
        display:"flex",
        flexDirection:"column",
        height: "40%",
        justifyContent: "center",
        textAlign: "center"
    }

}))


function Banner() {
    const classes=useStyles();
     const {language} = CryptoState();
     const [original,setOriginal] = useState('Crypto Hunter,Get all the Info regarding your favorite Crypto Currency');
     const [translated,setTranslated] = useState([])
      const API_KEY=  process.env.REACT_APP_API_KEY;

     const translateContent= async ()=> {
      try {
      const {data} = await axios.post(
       'https://translation.googleapis.com/language/translate/v2',
       null,
       {
         params: {
           q: original, // join the strings with a newline delimiter
           target: language,
           key: API_KEY,
         },
       }
     );
  //  split the translated text into an array of strings using the same delimiter
     const temp = data.data.translations.map((t) =>
       t.translatedText.split(',')
     );
      setTranslated(temp[0])
  console.log('banner',translated)
      }
        catch (e) {
              console.error(e);
        }
     

          
}

useEffect(() => {
  translateContent()
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [language])


    
  return (
    <div className={classes.banner}>
    <Container className={classes.bannerContent}>
    <div className={classes.tagline}>
     <Typography variant="h2"
       style={{
           fontWeight:"bold",
           marginBottom:15,
           fontFamily:"Montserrat",
       }}>
           {translated[0]}  
     </Typography>
     <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            {translated[1]}
          </Typography>
          <Carousel />
    </div>
    </Container>

    </div>
  )
  
}

export default Banner;
