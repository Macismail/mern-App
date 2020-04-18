import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Register from './components/register';
import Display from './components/display';
import Home from './components/home';
import Login from './components/login';

import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap-theme.css';

class App extends React.Component {
  // constactor
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <Router>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="/">Navbar</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="register">Register</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="display">Display</a>
              </li>
            </ul>
            <span className="navbar-text">
              <a className="nav-link" href="login">login</a>
            </span>
          </div>
        </nav>
        <h1 className="text-center"> welcome to MERN APPLICATION</h1><br />
        <Switch>
          <Route path="/" exact component={Home} />
          <Redirect from="/home" to="/" />
          <Route path="/register" exact component={Register} />
          <Route path="/display" exact component={Display} />
          <Route path="/login" exact component={Login} />
        </Switch>
      </Router>
      </div>
    );
  }
}

export default App;
