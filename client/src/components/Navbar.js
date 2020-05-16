import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Register from './Account/register';
import Display from './display';
import Home from './home';
import Login from './Account/login';

const Navbar = () => {

  const [isAuth, setToken] = useState();

  React.useEffect(() => {
    setToken(localStorage.getItem("token"))
  }, [])

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("email")
    window.location.href='/'  
  }

  return (
    <div>
      <Router>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="/">Ismail</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="display">Display</a>
              </li>
            </ul>
            {!isAuth ? (
            <div className="btn-group">
              <a className="nav-link" href="login">login</a>
              <a className="nav-link" href="register">Register</a>
            </div>
            ) : (
            <span>
              <button className="btn btn-link" onClick={logout}>logout</button>
            </span>
            )}
          </div>
        </nav> <br />
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

export default Navbar;