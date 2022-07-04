import logo from './logo.svg';
import './App.css';
import{BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from './Home/Home.js'
import Google from './Google/Google.js'
import Page404 from './404/404.js'
import Stock from './Stock/Stock.js'

function App() {
  return (
    <div className="App">
      <Router>
      <Switch>
      <Route exact path="/">
          <Home />
        </Route>
      <Route path="/google">
          <Google />
        </Route>
      <Route path="/stock">
          <Stock />
        </Route>
      <Route path="/">
          <Page404 />
        </Route>
      </Switch>
      </Router>
      
    </div>
  );
}

export default App;
