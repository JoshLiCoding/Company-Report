import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Line } from 'react-chartjs-2';
import React, { useState, useEffect } from 'react';
import './Home.css'

function Home() {
    const [hide, setHide] = useState("none");
    const [input, setInput] = useState();

    const [sector, setSector] = useState();
    const [name, setName] = useState();
    const [country, setCountry] = useState();
    const [exchange, setExchange] = useState();

    const [price, setPrice] = useState();
    const [five, setFive] = useState();
    const [fifty, setFifty] = useState();
    const [twohundred, setTwoHundred] = useState();
    const [fiveGR, setFiveGR] = useState();
    const [thirtyGR, setThirtyGR] = useState();

    const [graph, setGraph] = useState();

    const [news, setNews] = useState([]);

    const [peers, setPeers] = useState([]);

    function runFunc(stock) {
        const finnhub = require('finnhub');
        const api_key = finnhub.ApiClient.instance.authentications['api_key'];
        api_key.apiKey = "c3bsn6qad3iddisjsf5g"
        const finnhubClient = new finnhub.DefaultApi()

        finnhubClient.companyProfile2({ symbol: stock }, (error, data, response) => {
            setSector(data['finnhubIndustry'])
            setName(data['name']);
            setCountry(data['country']);
            setExchange(data['exchange']);
        })

        const now = parseInt(Date.now() / 1000);
        const then = now - 25920000;
        finnhubClient.stockCandles(stock, "D", then, now, {}, (error, data, response) => {
            var prices = data['c'];
            var len = prices.length;

            setPrice(prices[len - 1]);

            var formdays = [];
            for (var i = 0; i < len; i++) {
                var date = new Date(data['t'][i] * 1000);
                date.setDate(date.getDate() + 1);
                formdays[i] = date.toLocaleDateString();
            }

            //5DMA
            var five = 0;
            for (var i = len - 1; i >= len - 5; i--) {
                five += prices[i];
            }
            five /= 5;
            five = Math.round(five * 100) / 100;
            setFive(five);

            //50DMA
            var fifty = 0;
            for (var i = len - 1; i >= len - 50; i--) {
                fifty += prices[i];
            }
            fifty /= 50;
            fifty = Math.round(fifty * 100) / 100
            setFifty(fifty);

            //200DMA
            var twohundred = 0;
            for (var i = len - 1; i >= len - 200; i--) {
                twohundred += prices[i];
            }
            twohundred /= 200;
            twohundred = Math.round(twohundred * 100) / 100
            setTwoHundred(twohundred);

            var high = data['h'];
            var low = data['l'];

            //5DGR
            var high5 = 0;
            var low5 = 10000000;
            for (var i = len - 1; i >= len - 5; i--) {
                high5 = Math.max(high5, high[i]);
                low5 = Math.min(low5, low[i]);
            }
            var final5 = (high5 - low5) * 0.618 + low5;
            final5 = Math.round(final5 * 100) / 100;
            setFiveGR(final5);

            //30DGR
            var high30 = 0;
            var low30 = 10000000;
            for (var i = len - 1; i >= len - 30; i--) {
                high30 = Math.max(high30, high[i]);
                low30 = Math.min(low30, low[i]);
            }
            var final30 = (high30 - low30) * 0.618 + low30;
            final30 = Math.round(final30 * 100) / 100;
            setThirtyGR(final30);


            //Graph
            var closingprices = [];
            for (var i = len - 1; i >= len - 30; i--) {
                closingprices[29 - (len - i - 1)] = prices[i];
            }
            var dates = [];
            for (var i = 0; i <= 29; i++) {
                dates[i] = formdays[len - (29 - i) - 1];
            }
            var GR5D = [];
            for (var i = 0; i <= 29; i++) {
                GR5D[i] = final5;
            }
            var GR30D = [];
            for (var i = 0; i <= 29; i++) {
                GR30D[i] = final30;
            }

            const graphdata = {
                labels: dates,
                datasets: [
                    {
                        label: 'Price',
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
            setGraph(graphdata);

            const formatYmd = date => date.toISOString().slice(0, 10);
            var nowFmt = formatYmd(new Date());
            var thenFmt = new Date();
            thenFmt.setDate(thenFmt.getDate() - 1);
            thenFmt = formatYmd(thenFmt);
            finnhubClient.companyNews(stock, thenFmt, nowFmt, (error, data, response) => {
                setNews([]);
                for (var i = 0; i < Math.min(data.length, 3); i++) {
                    setNews((news) => [...news, [
                        data[i]['headline'],
                        data[i]['source'],
                        data[i]['url']
                    ]]);
                }
            })

            finnhubClient.companyPeers(stock, (error, data, response) => {
                setPeers(data.slice(1, 6))
            })

            setHide("block");
        });
    }

    function runPeer(stock) {
        setInput(stock);
        runFunc(stock);
        window.scrollTo(0, 0);
    }

    return (
        <div>
            <div>
                <h1>Company Report</h1>
                <TextField id="input" label="Enter Ticker" variant="outlined" value={input} onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => { if (e.keyCode == 13) { runFunc(input) } }} fullWidth />
                <Button variant="contained" style={{ marginTop: "1%" }} onClick={() => runFunc(input)}>search</Button>
                <div style={{ display: hide }}>
                    <div id="head">
                        <p id="sector">{sector}</p>
                        <h2 id="name">{name}</h2>
                    </div>
                    <div className="container">
                        <h3>Company Profile</h3>
                        <p>Country: {country}</p>
                        <p>Exchange: {exchange}</p>
                    </div>
                    <div className="container">
                        <h3>Stock Details</h3>
                        <p> Current Price: {price}</p>
                        <br></br>
                        <p>5 Day Moving Average: {five}</p>
                        <p>50 Day Moving Average: {fifty}</p>
                        <p>200 Day Moving Average: {twohundred}</p>
                        <br></br>
                        <p>5 Day Golden Ratio: {fiveGR}</p>
                        <p>30 Day Golden Ratio: {thirtyGR}</p>
                        <br></br>
                    </div>
                    <div className="container">
                        <h3>Stock Prices Chart</h3>
                        <Line data={graph} />
                        <br></br>
                    </div>
                    <div className="container">
                        <h3>Recent Stories</h3>
                        {news.length > 0 ? news.map((info) => (
                            <a href={info[2]} className='link' target='_blank'>
                                <div className='news'>
                                    <h4>{info[0]}</h4>
                                    <h6 style={{ color: '#77c8e5' }}>{info[1]}</h6>
                                </div>
                            </a>
                        )) : <p>No recent stories</p>}
                    </div>
                    <div className="container">
                        <h3>See Also</h3>
                        <div className='row'>
                            {peers.map((peer) => (
                                <div className='column'>
                                    <div className='peerBox' onClick={() => runPeer(peer)}>
                                        <h4>{peer}</h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;