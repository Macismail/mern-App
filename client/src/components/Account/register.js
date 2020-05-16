import React from 'react';
import { Base64 } from 'js-base64';
import axios from 'axios';

const Register = () => {

  const [isAuth, setAuth] = React.useState(false)
  React.useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      setAuth(true)
    }
  }, [])

  const [user, setUser] = React.useState({
    firstname: "", lastname: "", email: "",
    password: "", confpassword: "",
  })

  const [err, setErr] = React.useState({ emailErr: "", passwordErr: "", cpasswordErr: "" });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // validattion
    const isValid = validate();
    if (isValid) {
      setUser({
        ...user,
        password: Base64.encode(user.password)
      })
      console.log('data to send: ', user);
      axios({
        url: "/api/register",
        method: "POST",
        data: user
      })
        .then(() => {
          console.log('data sent to the server');
          this.resetUserInputs();
        })
        .catch(() => {
          console.log('Internel error...');
        });
        window.location.href = '/'
    }
  };

  // form validation
  const validate = () => {
    if (!user.email.includes('.')) {
      setErr({ emailErr: "Enter valid email" })
      return false
    }
    if (user.password.length < 8) {
      setErr({ passwordErr: "Password should be at least 8 characters" })
      return false
    }
    if (user.password !== user.confpassword) {
      setErr({ cpasswordErr: "Not match Password" })
      return false
    }
    return true
  }

  return (
    <React.Fragment>
    {isAuth ? (window.location.href = '/') : (
      <div className="container">
        <div className="card w-45" style={{backgroundColor: "#85C1E9", alignItems: "center"}}>
          <div className="card-body">
            <h3 className="card-title text-center">Register</h3><hr />
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <div className="form-label">First Name</div>
                <input className="form-control" type="text" name="firstname"
                  onChange={handleChange} placeholder="First Name" required
                />
              </div>
              <div className="form-group">
                <div className="form-label">Last Name</div>
                <input className="form-control" type="text" name="lastname"
                  onChange={handleChange} placeholder="Last Name" required
                />
              </div>
              <div className="form-group">
              <div className="form-label">Email Address</div>
                <input className="form-control" type="email" name="email" 
                  onChange={handleChange} placeholder="email" required
                />
                <p style={{ color: "red", fontSize: 12 }}>{err.emailErr}</p>
              </div>
              <div className="form-group">
              <div className="form-label">Password</div>
                <input className="form-control" type="password" name="password"
                  onChange={handleChange} placeholder="password" required
                />
                <p style={{ color: "red", fontSize: 12 }}>{err.passwordErr}</p>
              </div>
              <div className="form-group">
              <div className="form-label">Confirm Password</div>
                <input className="form-control" type="password" name="confpassword"
                  onChange={handleChange} placeholder="Confirm password"
                />
                <p style={{ color: "red", fontSize: 12 }}>{err.cpasswordErr}</p>
              </div><br />
              <div className="form-group text-center">
                <button className="btn btn-primary btn-block" type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )}
    </React.Fragment>
  );

}

export default Register;