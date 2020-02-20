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
// const MONGODB_URI = 'mongodb+srv://ismail:ismail77@cluster0-vcqrp.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mernapp_db', {
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
}

app.listen(PORT, console.log(`Server ie starting on port: ${PORT}`));