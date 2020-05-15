import React, { Component } from 'react';
import {Base64} from 'js-base64';
import axios from 'axios';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: '',
      lname: '',
      email: '',
      password: ''
    }
  }

  handleChange = ({target}) => {
    // const name = event.target.name;
    // const value = event.target.value; => the same as the 2 lines bellow
    const {name, value} = target;
    this.setState({ [name]: value });
  };

  submit = (event) => {
    event.preventDefault();

    const payload = {
      fname: this.state.fname,
      lname: this.state.lname,
      email: this.state.email,
      password: Base64.encode(this.state.password)
    }
    console.log('data to send: ', payload);
    axios({
      url: "/api/save",
      method: "POST",
      data: payload
    })
    .then(() => {
      console.log('data sent to the server');
      this.resetUserInputs();
    })
    .catch(() => {
      console.log('Internel error...');
    });
  };

  resetUserInputs = () => {
    this.setState({
      fname: '',
      lname: '',
      email: '',
      password: ''
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <form className="text-center" onSubmit={this.submit}>
              <div className="form-control">
                <input type="text"
                  name="fname"
                  onChange={this.handleChange}
                  value={this.state.fname}
                  placeholder="First Name"
                />
              </div>
              <div className="form-control">
                <input type="text"
                  name="lname"
                  onChange={this.handleChange}
                  value={this.state.lname}
                  placeholder="Last Name"
                />
              </div>
              <div className="form-control">
                <input type="email"
                  name="email"
                  onChange={this.handleChange}
                  value={this.state.email}
                  placeholder="email"
                />
              </div>
              <div className="form-control">
                <input type="password"
                  name="password"
                  onChange={this.handleChange}
                  value={this.state.password}
                  placeholder="password"
                />
              </div>
              <div className="form-control">
                <button className="btn btn-outline-primary btn-sm" type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div><hr />
      </div>
    );
  }
}

export default Register;