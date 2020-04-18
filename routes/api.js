const express = require('express');
const jwt = require('jsonwebtoken');
const AppUser = require('../models/AppUser');

const router = express.Router();

// registration
router.post('/save', (req, res) => {
  console.log("Body: ", req.body);
  const data = req.body;

  const newUser = new AppUser(data);
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
router.get('/login', (req, res) => {
  AppUser.findOne({email: req.doby.email})
  .then(data => {
    const user = data.json()
    if(!user) return res.json({success: false, nsg: 'email or password incorrect ...'})
    if(user.password != req.body.password) return res.json({success: false, nsg: 'password incorrect ...'})
    const token = jwt.sign(user.id, '77')
    res.json({email: user.email, token})
  })
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