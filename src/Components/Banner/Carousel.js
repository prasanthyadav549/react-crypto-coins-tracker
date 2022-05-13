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
    const {currency, symbol } = CryptoState();
      const fetchTrending = async ()=> {
          const {data}= await axios.get(TrendingCoins(currency));
          setTrending(data);
        //   console.log(data);
        
      }
      console.log(trending);
      useEffect(() => {
         fetchTrending();
      }, [currency]);
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

   const items=trending.map((coin)=> {
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
           {coin?.symbol}
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
