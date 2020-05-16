import React from 'react';
import { Base64 } from 'js-base64';
import axios from 'axios';

const Login = () => {
  const [user, setUser] = React.useState({ email: "", password: "" })
  const [err, setErr] = React.useState({ emailErr: "", passwordErr: "" })

  // get form values
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  };

  // sned user details to the server
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log('data to send: ', user)
    axios({
      url: "/api/login",
      method: "POST",
      data: user
    })
      .then(res => {
        const data = res.data
        if (data.token) {
          localStorage.setItem("email", data.email)
          localStorage.setItem("token", data.token)
          console.log('token: ', data.token)
          window.location.href = '/'
        } else if (data.success) {
          setErr({ passwordErr: data.msg })
        } else {
          setErr({ emailErr: data.msg })
        }
      })
      .catch(() => {
        console.log('error retreiving data');
      })
  }

  return (
    <React.Fragment>
      {!localStorage.getItem("token") ? (
        <div className="container">
          <div className="card" style={{ backgroundColor: "#85C1E9", alignItems: "center"}}>
            <div className="card-body">
              <h3 className="card-title text-center">Login</h3><hr />
              <form onSubmit={handleSubmit}>
                <div>
                  <div className="form-group">
                    <div className="form-label">Email address</div>
                    <input className="form-control" type="email" name="email"
                      onChange={handleChange} placeholder="Enter email" required />
                    <p className="text-center" style={{ color: "red", fontSize: 14 }}>{err.emailErr}</p>
                  </div>

                  <div className="form-group">
                    <div className="form-label">Password</div>
                    <input className="form-control" type="password" name="password"
                      onChange={handleChange} placeholder="Password" required />
                    <p className="text-center" style={{ color: "red", fontSize: 14 }}>{err.passwordErr}</p>
                  </div>

                  <div className="form-group">
                    <input type="checkbox" /> Check me out
                  </div><br />
                  <button className="btn btn-primary btn-block" type="submit">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>) : (
          window.location.href = '/'
        )}
    </React.Fragment>
  );

}

export default Login;