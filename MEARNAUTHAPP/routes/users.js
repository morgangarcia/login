const express = require('express');
const router = express.Router();
const passport = require('../passport');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);

/* GET users listing. */
router.post('/signup', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username }).exec((err, user) => {
    if (err) {
      return res.status(404).json(err);
    }// 
    if (user) {
      return res.status(404).send('User already excists');
    }


    const encryptedPassword = bcrypt.hashSync(password, salt);
    let newUser = new User({
      username,
      password: encryptedPassword

    });

    newUser.save((error, inserted) => {
      if (error) {
        res.status(400).json(error);
      }

      res.status(201).end()
    });
  });
});

router.post('/signin', passport.authenticate('local', {}), function (req, res) {

  res.redirect('/profile/' + req.user.username);
});
//Custom Passport Callback
// passport.authenticate('local-signin', function (error, user, info) {


//   if (error) {
//     return res.status(500).json({
//       message: error || 'Oops something happened!',
//     });
//   }

//   //Persistnet login
//   req.logIn(user, function (error) {
//     if (error) {
//       return res.status(500).json({
//         message: error || 'Oops something happened',
//       });
//     }
//     user.isAuthenticated = true;
//     return res.json(user);
//   });

//(req, res, next);
// });
router.get('/api', (req, res) => {
  const username = req.user;
  res.json({
    message: 'Hello World'
  });
});


module.exports = router;
