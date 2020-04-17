import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import register from './component/register';
import home from './component/home';
import showUserd from './component/showUsers';

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
                  <a className="navbar-brand" href="register">Register</a>
                </li>
                <li className="nav-item">
                  <a className="navbar-brand" href="showUserd">Display</a>
                </li>
              </ul>
              <span className="navbar-text">
                <Link to="/login">login</Link>
              </span>
            </div>
          </nav>
          <div className="container">
            <h1 className="text-center"> welcome to MERN APPLICATION</h1><br />
          </div>
          <Switch>
            <Route path="/" exact component={ home } />
            <Route path="/register" exact component= { register } />
            <Route path="/showUserd" exact component= { showUserd } />
            
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
