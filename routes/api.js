const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// registration
router.post('/save', (req, res) => {
  console.log("Body: ", req.body);
  const data = req.body;

  const newUser = new User(data);
  newUser.save((error) => {
    if(error){
      res.status(500).json({msg: 'Sorry: Internal Server error'});
    }else{
      res.json({
        msg: 'we received and save your data'
      });
    }
  });
});

// login
router.post('/login', (req, res) => {
  User.findOne({email: req.body.email})
  .then((data) => {
    const user = data
    if(!user){
      res.json({success: false, nsg: 'email or password incorrect ...'})
    }else {
      if(user.password === req.body.password){
        const token = jwt.sign(user.id, '77');
        res.json({email: user.email, token});
      }
      else {
        res.json({success: false, nsg: 'password incorrect ...'})
      }
    }
  })
});

router.get('/users', (req, res) => {
  User.find({ })
  .then((data) => {
    console.log('Data: ', data);
    res.json(data);
  })
  .catch((error) => {
    console.log('Error: ', error);
  });
});

module.exports = router;