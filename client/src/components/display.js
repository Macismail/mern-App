import React, { Component } from 'react';
import {Base64} from 'js-base64';
import axios from 'axios';

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {  
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
          <h3>Full Name: {post.fname} {post.lname}</h3>
          <p>Email: {post.email} </p>
          <b>PassWord: {Base64.decode(post.password)}</b><hr/>
        </div>
      ));
    };

  render() { 
    return (  
      <div className="container">
      <div className="text-center">
        {this.displayUsers(this.state.posts)}
      </div>
      </div>
    );
  }
}
 
export default Display;