import { CircularProgress, createTheme, makeStyles, ThemeProvider } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { HistoricalChart } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { Line } from 'react-chartjs-2';
import { chartDays } from '../config/data';
import SelectButton from './SelectButton';



const useStyles = makeStyles((theme)=>({ 
  container: {
    display: "flex",
    width: "75%",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    padding:40,
    [theme.breakpoints.down("md")]: {
      width: "100%",
       marginTop: 0,
        padding:20,
      alignItems: "center",
      paddingTop: 0,
    },
  },

}));


const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});

const CoinInfo = ({coin}) => {
  const [historicData, setHistoricData] = useState()
  const [days, setDays] = useState(1)
  const { currency} =CryptoState();
  const classes = useStyles();

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id,days,currency));
    setHistoricData(data.prices);
  }
  console.log(historicData);
  useEffect(() => {
    fetchHistoricData();
    
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  , [days,currency]);

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>

             {
               !historicData ? (
                 <CircularProgress 
                  size={250}
                  thickness={2}
                  style={{alignSelf:"center",
                    color:"gold",
                  }}
                 />
                ) : (
                  <>
                   <Line 
                     data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}

              // this is when we place a cursor on the graph the pointer will show as a small circle
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}

                   />
                      <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        marginTop: 20,
                        width: "100%",
                      }}
                      >
                      {
                        chartDays.map((day) => (  
                         
                          <SelectButton
                            key={day.value}
                            onClick={() => setDays(day.value)}
                            selected={days === day.value}
                          >
                            {day.label}
                          </SelectButton>


                        ))
                      }


                      </div>



                  </>
                )
             }         

      </div>

    </ThemeProvider>
   
  )
}

export default CoinInfo
