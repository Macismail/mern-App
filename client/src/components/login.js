import React, { Component } from 'react';
import {Base64} from 'js-base64';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }
  // get form values
  handleChange = ({target}) => {
    // const name = event.target.name;
    // const value = event.target.value; => the same as the 2 lines bellow
    const {name, value} = target;
    this.setState({ [name]: value });
  };
  // sned user details to the server
  submit = (event) => {
    event.preventDefault();
    
    const loginData = {
      email: this.state.email,
      password: this.state.password
    }
    console.log('data to send: ', loginData)
    axios({
      url: "/api/login",
      method: "POST",
      data: loginData
    })
    .then(res => {
      const data = res.data
      localStorage.setItem("email", data.email)
      localStorage.setItem("token", data.token)
      console.log('token: ', data.token)
    })
    .catch(() => {
      alert('error retreiving data');
    })
  }

  render() {
    return (
      <div className="container">
        <div className="card">
          <div className="card-body">
            <form onSubmit={this.submit}>
              <div className="form-group">
                <div className="form-label">Email address</div>
                <input className="form-control" type="email" 
                  name="email"
                  onChange={this.handleChange}
                  value={this.state.email}
                  placeholder="Enter email" />
              </div>

              <div className="form-group">
                <div className="form-label">Password</div>
                <input className="form-control" type="password" 
                  name="password"
                  onChange={this.handleChange}
                  value={this.state.password}
                  placeholder="Password" />
              </div>

              <div className="form-group">
                <input type="checkbox" /> Check me out
              </div>
              <button className="btn btn-outline-success btn-sm" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
        <h3 className="text-center">Token: {localStorage.getItem('token')}</h3>
      </div>
    );
  }
}

export default Login;