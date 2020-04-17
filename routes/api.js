const express = require('express');
const AppUser = require('../models/AppUser');

const router = express.Router();

// Routes
router.post('/save', (req, res) => {
  console.log("Body: ", req.body);
  const data = req.body;

  const newUser = new AppUser(data);
  // save data to db
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