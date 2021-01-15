var express = require('express');
var database = require('../database/user.js')

var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('signup.pug');
});

router.post('/', function(req, res, next) {
  if (req.body.password1 !== req.body.password2){
    res.send('Password mismatch');
  }else{
    database.userExist(req.body.name, (result)=> {
        if (result){
          res.send('User already exist');
        }else{}
          database.createUser(req.body.name, req.body.password1)
          res.send('Your are now a membrer!');
    });
  }

});

module.exports = router;