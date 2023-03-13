import { makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { CryptoState } from '../../CryptoContext';
import axios from "axios";
  import {TrendingCoins} from '../../config/api';
  import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
  
const useStyles= makeStyles(()=> ({
      carousel: {
          display:"flex",
          textAlign:"center",
          height:"50%",
      },
      carouselItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        textTransform: "uppercase",
        color: "white",
       marginTop: 50, 
        marginBottom: 30,
        
      },
}))

function Carousel() {
    const classes=useStyles();
    const [trending, setTrending] = useState([]);
    const {currency, symbol ,language} = CryptoState();
    const [content,setContent] = useState([]);

    const API_KEY = process.env.REACT_APP_API_KEY;
      const fetchTrending = async ()=> {
          const {data}= await axios.get(TrendingCoins(currency));
          setTrending(data);
            trending.map((coin)=>console.log('coin', coin.symbol))
        //   console.log(data);
        
      }
         const translateContent= async ()=> {
               const res = trending.map((coin)=>coin.symbol).join(',');
               const { data } = await axios.post(
                'https://translation.googleapis.com/language/translate/v2',
                null,
                {
                  params: {
                    q: res, // join the strings with a newline delimiter
                    target: language,
                    key: API_KEY,
                  },
                }
              );
              // split the translated text into an array of strings using the same delimiter
              const temp = data.data.translations.map((t) =>
                t.translatedText.split(',')
              );
              setContent(temp[0]);
              content.map((c,index)=> console.log('data',c,index))

                   
         }
      

      useEffect(() => {
         fetchTrending();
      }, [currency]);

      useEffect(() => {


            translateContent();

      },[language]);
      const responsive={
          0: {
              items:2,
          },
          512: {
              items:4,
          },

      }
      const numberWithCommas=(x)=> {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }

   const items=trending.map((coin,index)=> {
       let profit=coin.price_change_percentage_24 >= 0;
       return (
        <Link 
        className={classes.carouselItem}
        to={`/coins/${coin.id}`}
        >
        <img
            src={coin.image} alt={coin.name}
            style={{marginBottom:10,
          
            }}
            height="80"
        />
           <span>
           {content[index]}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
           </span>
           
          
           <span style={{fontSize:22,fontWeight:500}}>
              {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
           </span>
        </Link>
       )
   })



      
  return (
      <div className={classes.carousel}>
               <AliceCarousel
                    mouseTracking
                   infinite
                   autoPlayInterval={1000}
                   animationDuration={1500}
                   disableDotsControls
                   responsive={responsive}
                   autoPlay
                   items={items}
                   disableButtonsControls
               />
                

      </div>
  )
}

export default Carousel;
