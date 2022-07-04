import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Line } from 'react-chartjs-2';
import React, { useState } from 'react';


class Stock extends React.Component{
    constructor(props) {
        super(props);
        this.state = {data: ""};
    }
    async getPrice(stock){
        document.getElementById("price").innerHTML = "Current Price: ";
        const yahooStockPrices = require('yahoo-stock-prices')
        const price = await yahooStockPrices.getCurrentPrice(stock);
        console.log(price);
        document.getElementById("price").innerHTML += price;
    }

    runStock(stock){
        console.log(stock);
    
        this.getPrice(stock);
        const finnhub = require('finnhub');
        const api_key = finnhub.ApiClient.instance.authentications['api_key'];
        api_key.apiKey = "c3bsn6qad3iddisjsf5g" // Replace this
        const finnhubClient = new finnhub.DefaultApi()
        const now = parseInt(Date.now()/1000);
        //console.log(now);
        const then = now-25920000;
        //console.log(then);
        finnhubClient.stockCandles(stock, "D", then, now, {}, (error, data, response) => {
            document.getElementById("five").innerHTML = "5DMA: ";
            document.getElementById("fifty").innerHTML = "50DMA: ";
            document.getElementById("twohundred").innerHTML = "200DMA: ";
            document.getElementById("fiveG").innerHTML = "5DGR: ";
            document.getElementById("thirtyG").innerHTML = "30DGR: ";
    
    
            var prices = data['c'];
            //console.log(prices);
            var len = prices.length;

            var formdays=[];
            for(var i = 0; i < len; i++){
                var date = new Date(data['t'][i] * 1000);
                formdays[i] = date.toLocaleDateString();
            }   
    
            //5DMA
            var five = 0;
            for(var i = len-1; i >= len-5; i--){
                five += prices[i];
            }
            five /= 5;
            five = Math.round(five * 100) / 100
            console.log(five);
            document.getElementById("five").innerHTML += five;
    
            //50DMA
            var fifty = 0;
            for(var i = len-1; i >= len-50; i--){
                fifty += prices[i];
            }
            fifty /= 50;
            fifty = Math.round(fifty * 100) / 100
            console.log(fifty);
            document.getElementById("fifty").innerHTML += fifty;
    
            //200DMA
            var twohundred = 0;
            for(var i = len-1; i >= len-200; i--){
                twohundred += prices[i];
            }
            twohundred /= 200;
            twohundred = Math.round(twohundred * 100) / 100
            console.log(twohundred);
            document.getElementById("twohundred").innerHTML += twohundred;
    
            var high = data['h'];
            var low = data['l'];
    
            //5DGR
            var high5 = 0;
            var low5 = 10000000;
            for(var i = len-1; i >= len-5; i--){
                high5 = Math.max(high5, high[i]);
                low5 = Math.min(low5, low[i]);
            }
            var final5 = (high5-low5)*0.618+low5;
            final5 = Math.round(final5 * 100) / 100
            console.log(final5);
            document.getElementById("fiveG").innerHTML += final5;
    
            //1MGR
            var high30 = 0;
            var low30 = 10000000;
            for(var i = len-1; i >= len-30; i--){
                high30 = Math.max(high30, high[i]);
                low30 = Math.min(low30, low[i]);
            }
            var final30 = (high30-low30)*0.618+low30;
            final30 = Math.round(final30 * 100) / 100
            console.log(final30);
            document.getElementById("thirtyG").innerHTML += final30;
            

            //Graph
            var closingprices = [];
            for(var i = len-1; i >= len-30; i--){
                closingprices[29-(len-i-1)] = prices[i];
            }
            var dates = [];
            for(var i = 0; i <= 29; i++){
                dates[i] = formdays[len-(29-i)-1];
            }
            //console.log(closingprices);
            //console.log(dates);
            var GR5D = [];
            for(var i = 0; i <= 29; i++){
                GR5D[i] = final5;
            }
            var GR30D = [];
            for(var i = 0; i <= 29; i++){
                GR30D[i] = final30;
            }

            const graphdata = {
                labels: dates,
                datasets: [
                    {
                        label: 'Prices',
                        data: closingprices,
                        fill: false,
                        backgroundColor: '#ff0000',
                        borderColor: '#ffc7c7',
                    },
                    {
                        label: "5DGR",
                        data: GR5D,
                        fill: false,
                        pointRadius: "0",
                        backgroundColor: 'white',
                        borderColor: '#66c3e3',
                    },
                    {
                        label: "30DGR",
                        data: GR30D,
                        fill: false,
                        pointRadius: "0",
                        backgroundColor: 'white',
                        borderColor: '#999eb0',
                    },
                ],
            };
            console.log(graphdata);
            this.setState({
                data: graphdata
              });
        });
    }

    render() {
        return(
            <div>
                <a href="./" style={{float: "right", color: "black"}}>Home</a>
                <div  style={{float: "left", width: "80%"}}>
                    <h1>Stock</h1>
                    <TextField id="input" label="Search Stock" variant="outlined" fullWidth />
                    <Button variant="contained" style={{marginTop: "1%"}} onClick={() => this.runStock(document.getElementById("input").value)}>search</Button>
                    <div style={{marginTop: "5%"}}>
                        <p id="price">Current Price: </p>
                        <br></br>
                        <p id="five">5DMA: </p>
                        <p id="fifty">50DMA: </p>
                        <p id="twohundred">200DMA: </p>
                        <br></br>
                        <p id="fiveG">5DGR: </p>
                        <p id="thirtyG">1MGR: </p>
                        <br></br>
                    </div>
                    <div id="graph">
                        <p id="price">Prices for last 30 trading days: </p>
                        <Line data={this.state.data} width={1100} height={400} options={{ maintainAspectRatio: false, responsive: false }} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Stock;