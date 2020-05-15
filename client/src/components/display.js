import React from 'react';
import { Base64 } from 'js-base64';
import axios from 'axios';

const Display = () => {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    getUsersDetails();
  }, [])

  const getUsersDetails = () => {
    axios.get('/api/users')
      .then((res) => {
        setUsers(res.data);
        console.log('data has been received ....');
      })
      .catch(() => {
        alert('error retreiving data');
      })
  }

  return (
    <React.Fragment>
      {
        users ? (
          <div className="container" >
            <div className="text-center">
              {users.map((user, index) => (
                <div key={index}>
                  <h3>Full Name: {user.firstname} {user.lastname}</h3>
                  <p>Email: {user.email} </p>
                  <b>PassWord: {user.password}</b><hr />
                </div>
              ))}
            </div>
          </div >
        ) : (
            <div> No users in the list </div>
          )}
    </React.Fragment>
  );

}

export default Display;