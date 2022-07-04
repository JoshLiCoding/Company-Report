import { Line, Doughnut, Radar } from 'react-chartjs-2';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import './Google.css';

function Google() {
    const data1 = {
        labels: ['2016', '2017', '2018', '2019', '2020'],
        datasets: [
            {
                label: 'Revenues',
                data: [90272, 110855, 136819, 161857, 182527],
                fill: false,
                backgroundColor: '#ff0000',
                borderColor: '#ffc7c7',
            },
            {
                label: 'Costs & Expenses',
                data: [66556, 84709, 109295, 127626, 141303],
                fill: false,
                backgroundColor: '#3487a4',
                borderColor: '#dcecf2',
            },
        ],
    };
    const data2 = {
        labels: ['2016', '2017', '2018', '2019', '2020'],
        datasets: [
            {
                label: 'Assets',
                data: [167497, 197295, 232792, 275909, 319616],
                fill: false,
                backgroundColor: '#ff0000',
                borderColor: '#ffc7c7',
            },
            {
                label: 'Liabilities',
                data: [28461, 44793, 55164, 74467, 97072],
                fill: false,
                backgroundColor: '#3487a4',
                borderColor: '#dcecf2',
            },
            {
                label: "Stockholders' Equity",
                data: [139036, 152502, 177628, 201442, 222544],
                fill: false,
                backgroundColor: '#55596a',
                borderColor: '#ededed',
            },
        ],
    };
    const data3 = {
        labels: ['Google Search & other', 'YouTube ads', 'Google Network Members’ properties', 'Google other', 'Google Cloud', 'Other Bets', 'Hedging gains'],
        datasets: [
          {
            label: 'Revenues',
            data: [104062, 19772, 23090, 21711, 13059, 657, 176],
            backgroundColor: [
              '#ffc7c7',
              '#dcecf2',
              '#ededed',
              '#cfffdc',
              '#f7e8ff',
              '#fff9d6',
              '#ffdbfb',
            ],
            borderColor: [
              '#ff0000',
              '#3487a4',
              '#55596a',
              '#27d957',
              '#ac49e6',
              '#ffd900',
              '#f200d6',
            ],
            borderWidth: 1,
          },
        ],
      };
      const data4 = {
        labels: ['Environment Risk', 'Social Risk', 'Governance Risk'],
        datasets: [
          {
            label: 'Score',
            data: [0.5, 9.9, 11.9],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: '#ff0000',
            borderWidth: 1,
          },
        ],
      };
      
    const finnhub = require('finnhub');
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = "c3bsn6qad3iddisjsf5g" // Replace this
    const finnhubClient = new finnhub.DefaultApi()
    finnhubClient.quote("GOOGL", (error, data, response) => {
        document.getElementById('o').innerHTML += data['o'];
        document.getElementById('c').innerHTML += data['c'];
        document.getElementById('pc').innerHTML += data['pc'];
        document.getElementById('h').innerHTML += data['h'];
        document.getElementById('l').innerHTML += data['l'];
    });
    finnhubClient.companyBasicFinancials("GOOGL", "margin", (error, data, response) => {
        document.getElementById('f').innerHTML += data['metric']['freeOperatingCashFlow/revenue5Y']
        document.getElementById('g').innerHTML += data['metric']['grossMargin5Y']
        document.getElementById('n').innerHTML += data['metric']['netProfitMargin5Y']
        document.getElementById('op').innerHTML += data['metric']['operatingMargin5Y']
        document.getElementById('p').innerHTML += data['metric']['pretaxMargin5Y']
    });

    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    
    return (
        <div>
            <div style={{float: "left", width: "80%"}}>
                <p style={{ marginBottom: "0px", color: "red" }}>Company</p>
                <h1 style={{ marginTop: "0px" }}>Google</h1>
                <p>Google's core business areas contain Google Services (Android, Chrome, Gmail, Google Drive, Google Maps, Google Photos, Google Play, Search, and YouTube), Google Cloud (Google Cloud Platform and Google Workspace) and Other Bets.</p>
            </div>
            <a href="./" style={{float: "right", color: "black"}}>Home</a>
            <div style={{float: "left", width: "100%"}}>
                <h3 className="titlestyle">Revenues | Costs & Expenses</h3>
                <Line data={data1} width={1100} height={400} options={{ maintainAspectRatio: false, responsive: false }} />
                <h3 className="titlestyle">Assets | Liabilities | Stockholders' Equity</h3>
                <Line data={data2} width={1100} height={400} options={{ maintainAspectRatio: false, responsive: false }} />
                <h3 className="titlestyle">Revenues by Type</h3>
                <Doughnut data={data3} width={1100} height={400} options={{ maintainAspectRatio: false, responsive: false }} />
                <h3 className="titlestyle">ESG</h3>
                <Radar data={data4} width={1100} height={400} options={{ maintainAspectRatio: false, responsive: false }} />
                <h3 className="titlestyle">Tweets</h3>
                <div style={{float: "left", width: "100%"}}>
                    <div style={{float: "left", width: "49%"}}><TwitterTweetEmbed tweetId={'1408000852581748736'}/></div>
                    <div style={{float: "right", width: "49%"}}><TwitterTweetEmbed tweetId={'1406337513740849155'}/></div>
                </div>
                <div style={{marginTop: "3%", float: "left"}}>
                    <h3>Stock Quote: {date}</h3>
                    <div>
                        <p id="o">Open: </p>
                        <p id="c">Close: </p>
                        <p id="pc">Previous Close: </p>
                        <p id="h">High: </p>
                        <p id="l">Low: </p>
                    </div>
                </div>
                <div style={{marginTop: "3%", float: "right", width: "60%"}}>
                    <h3>Basic Financials (5Y):</h3>
                    <div>
                        <p id="f">Free Operating Cash Flow / Revenue: </p>
                        <p id="g">Gross Margin: </p>
                        <p id="n">Net Profit Margin: </p>
                        <p id="op">Operating Margin: </p>
                        <p id="p">Pre-tax Margin: </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Google;