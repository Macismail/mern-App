import React from 'react';
import { Base64 } from 'js-base64';
import axios from 'axios';

const Login = () => {
  const [user, setUser] = React.useState({ email: "", password: "" })

  // get form values
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  };
  // sned user details to the server
  const submit = (event) => {
    event.preventDefault();

    console.log('data to send: ', user)
    axios({
      url: "/api/login",
      method: "POST",
      data: user
    })
      .then(res => {
        const data = res.data
        localStorage.setItem("email", data.email)
        localStorage.setItem("token", data.token)
        console.log('token: ', data.token)
        window.location.href='/'
      })
      .catch(() => {
        alert('error retreiving data');
      })
  }

  return (
    <React.Fragment>
    {!localStorage.getItem("token") ? (
      <div className="container">
        <div className="card">
          <div className="card-body">
            <form onSubmit={submit}>
              <div className="form-group">
                <div className="form-label">Email address</div>
                <input className="form-control" type="email"
                  name="email"
                  onChange={handleChange}
                  value={user.email}
                  placeholder="Enter email" required />
              </div>

              <div className="form-group">
                <div className="form-label">Password</div>
                <input className="form-control" type="password"
                  name="password"
                  onChange={handleChange}
                  value={user.password}
                  placeholder="Password" required />
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
      </div> ) : (
        window.location.href='/'
      )}
    </React.Fragment>
  );

}

export default Login;