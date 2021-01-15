var express = require('express');
var database = require('../database/user.js')

var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('signin.pug');
});

router.post('/', function(req, res, next) {
  database.userAuth(req.body.name, req.body.password, (result)=> {
    if (result){
      res.send('Your are now authenticated');
    }else{
      res.send('signin fail')
    }
  });
});

module.exports = router;