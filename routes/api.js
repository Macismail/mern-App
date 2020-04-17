const express = require('express');
const AppUser = require('../models/AddUser');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Routes
router.post('/register', (req, res) => {
  console.log("Body: ", req.body);
  const data = req.body;

  const newUser = new AppUser(data);
  // save data to db
  newUser.save((error) => {
    if(error){
      res.status(500).json({msg: 'Sorry: Internal Server error'});
    }else{
      // const token = jwt.sign(newUser.id, '77')
      // res.json({fname: newUser.fname, token})
      res.json({ msg: 'data received and saved ...' });
    }
  });
});

router.get('/users', (req, res) => {
  AppUser.find({ })
  .then((data) => {
    console.log('Data: ', data);
    res.json(data);
  })
  .catch((error) => {
    console.log('Error: ', error);
  });
});

module.exports = router;