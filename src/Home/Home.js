import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import './Home.css'

function Home() {
    return (
        <div>
            <h1 style={{ marginTop: "0px" }}>Company Summaries</h1>
            <p style={{ marginTop: "0px" }}>Josh Li</p>
            <Card className="cardstyle">
                <CardContent>
                    <h2>Google</h2>
                    <img src="https://img-authors.flaticon.com/google.jpg" style={{height: "50px", width: "50px", objectFit: "cover"}}></img>
                </CardContent>
                <CardActions>
                    <Button size="small" href="./google">go</Button>
                </CardActions>
            </Card>
            <Card className="cardstyle">
                <CardContent>
                    <h2>Facebook</h2>
                    <img src="https://i.pinimg.com/736x/ac/57/3b/ac573b439cde3dec8ca1c6739ae7f628.jpg" style={{height: "50px", width: "50px", objectFit: "cover"}}></img>
                </CardContent>
                <CardActions>
                    <Button size="small" href="./facebook">go</Button>
                </CardActions>
            </Card>
            <Card className="cardstyle">
                <CardContent>
                    <h2>Tencent</h2>
                    <img src="https://1000logos.net/wp-content/uploads/2018/10/Tencent-Logo.jpg" style={{height: "50px", width: "100px", objectFit: "cover"}}></img>
                </CardContent>
                <CardActions>
                    <Button size="small" href="./tencent">go</Button>
                </CardActions>
            </Card>
            <Card className="cardstyle">
                <CardContent>
                    <h2>Chevron</h2>
                    <img src="https://www.chevron.com/-/media/shared-media/images/chevron-hallmark-twitter.jpg" style={{height: "50px", width: "50px", objectFit: "cover"}}></img>
                </CardContent>
                <CardActions>
                    <Button size="small" href="./chevron">go</Button>
                </CardActions>
            </Card>
            <a href="./stock" style={{color: "black"}}>Stock</a>
        </div>
    );
}
export default Home;