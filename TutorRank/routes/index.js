var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
/* GET home page. */



router.get('/', function (req, res) {
  res.render('index', { user : req.user, title: "blah" });
});

<<<<<<< HEAD
  router.get('/register', function(req, res) {
      res.render('register', {info : "stuff"});
  });
=======
router.get('/register', function(req, res) {
  res.render('register', {info : "stuff"});
});
>>>>>>> 139e456a5e105f419b95da003563ce7629aa6f6a

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


router.get('/update', isLoggedIn, function(req, res) {
  res.render('update.ejs', {
      user : req.user // get the user out of session and pass to template
    });
});

router.post('/update/:id', function(req, res) {
  console.log(req.body.prof_type);
  console.log(req.body.profilepic);
  console.log(req.body.whoami);
  var profile_type = req.body.prof_type;
  var pic = req.body.profilepic;
  var aboutme = req.body.whoami;
  console.log(req.body.whoami);
  User.findById(req.params.id,function(err, userup){
    if (!userup)
      return next(new Error("Couldn't load user"));
    else {
      userup.prof_type = profile_type;
      userup.profilepic = pic;
      userup.whoami = aboutme;
      userup.save(function(err) {
        if (err)
          console.log('error on update');
        else
          console.log('successful update');
      });
    }
  });
    res.redirect('/profile');

});

router.post('/profile', function(req, res) {

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
