// import npm package
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
// const AppUser = require('./models/AppUser');
const routes = require('./routes/api');


const app = express();
const PORT = process.env.PORT || 8080;

// connect to mongodb
const MONGODB_URI = 'mongodb+srv://ismail:ismail77@cluster0-vcqrp.mongodb.net/mern_db?retryWrites=true&w=majority';
// to connect app db with sandBox 
// MONGODB_URI = 'mongodb://heroku_x7f0dnv9:s20h6f14a0h953i6g07h0hq0mo@ds351628.mlab.com:51628/heroku_x7f0dnv9'

mongoose.connect(process.env.MONGODB_URI || MONGODB_URI || 'mongodb://localhost/mernapp_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected .....')
});
// data parsing
app.use(express.json());
app.use(express.urlencoded({extended: false}));
/*
// save data to mongodb
const data = {
  fname: 'samsomy',
  lname: 'maccccc',
  email: 'samsomy@gmail.com',
  password: 'samsomypw'
};

const newappuser = new AppUser(data); // new instence of the model

newappuser.save((error) => {
  if(error){
    console.log('Ooops! something went wrong ...');
  }else{
    console.log('Data saved Successfully ...');
  }
});
*/
// http request logger
app.use(morgan('tiny'));
app.use('/api', routes);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));

  // redirect the queries to the index file
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, console.log(`Server ie starting on port: ${PORT}`));