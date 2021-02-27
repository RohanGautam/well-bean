import React, { Component } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

import Login from "./components/Login"
import Home from "./components/Home"
import './App.css';

class App extends Component {
  render() {
    return (      
      <Router>
        <div>
          <Switch>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/">
              <Login />
            </Route>
          </Switch>
        </div>
      </Router>
      
    );
  }
}

export default App;
