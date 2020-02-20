import React from 'react';
import axios from 'axios';

class App extends React.Component {
  // constactor
  constructor (props) {
    super(props)
    this.state = {
      fname: '',
      lname: '',
      email: '',
      password: '',
      posts: []
    }
  }

  // get users details
  componentDidMount = () => {
    this.getUsersDetails();
  };
  getUsersDetails = () => {
    axios.get('/api/users')
    .then((response) => {
      const data = response.data;
      this.setState({ posts: data });
      console.log('data has been received ....');
    })
    .catch(() =>{
      alert('error retreiving data');
    })
  }
  // display users details
  displayUsers = (posts) => {
    if(!posts.length) return null;

    return posts.map((post, index) => (
      <div key={index}>
        <h3>{post.fname} {post.lname}</h3>
        <p> {post.email} </p>
      </div>
    ));
  };

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
      password: this.state.password
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
      this.getUsersDetails();
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

  render(){
    return (
      <div>
        <h1> welcome to MERN APPLICATION</h1>
        <form onSubmit={this.submit}>
          <div className="form-control">
            <input type="text" 
              name="fname" 
              onChange={this.handleChange} 
              value={this.state.fname}
              placeholder = "First Name"
            />
          </div>
          <div className="form-control">
            <input type="text" 
              name="lname" 
              onChange={this.handleChange} 
              value={this.state.lname}
              placeholder = "Last Name"
            />
          </div>
          <div className="form-control">
            <input type="email" 
              name="email" 
              onChange={this.handleChange} 
              value={this.state.email}
              placeholder = "email"
            />
          </div>
          <div className="form-control">
            <input type="password" 
              name="password" 
              onChange={this.handleChange} 
              value={this.state.password}
              placeholder = "password"
            />
          </div>
          <div className="form-control">
            <button type="submit">Submit</button>
          </div>
        </form>

        <div className="users-details">
          {this.displayUsers(this.state.posts)}
        </div>
      </div>
    );  
  }
}

export default App;
