var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
/* GET home page. */



  router.get('/', function (req, res) {
      res.render('index', { user : req.user });
  });

  router.get('/register', function(req, res) {
      res.render('register', {info : "stuff"});
  });

  router.post('/register', function(req, res) {
      User.register(new User({ username : req.body.username }), req.body.password, function(err, account) {
          if (err) {
            return res.render("register", {info: "Sorry. That username already exists. Try again."});
          }

          passport.authenticate('local-signup')(req, res, function () {
            res.redirect('/');
          });
      });
  });

  router.get('/login', function(req, res) {
      res.render('login', {});
  });

  router.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.ejs', {
      user : req.user // get the user out of session and pass to template
    });
  });


  router.post('/login', passport.authenticate('local', {
      successRedirect : '/profile',
      failureRedirect : '/login',
      failureFlash : true
  }));

  router.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
  });

  router.get('/ping', function(req, res){
      res.send("pong!", 200);
  });

  function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
      return next();
    res.redirect('/');
  };
  


module.exports = router;
