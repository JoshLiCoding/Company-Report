import logo from './logo.svg';
import './App.css';
import { HashRouter, Route, Switch } from "react-router-dom";
import Home from './Home/Home.js'
import Google from './Google/Google.js'
import Page404 from './404/404.js'

const App = () => (
  <div className='App'>
    <HashRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/google">
          <Google />
        </Route>
        <Route path="/">
          <Page404 />
        </Route>
      </Switch>
    </HashRouter>
    </div>
);

export default App;
