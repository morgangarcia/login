const passport = require('passport');
const User = require('../models/user');

passport.serializeUser(function (user, done) {
    done(null, user.username);
});

passport.deserializeUser(function (username, done) {
    User.findOne({ username }).lean().exec((err, user) => {
        done(err, user);
    });
});

//import all the Strategies

// const SignupStrategy = require('./SignupStrategy');
const SigninStrategy = require('./SigninStrategy');
// const GoogleStrategy = require('./GoogleStrategy');
// const GithubStrategy = require('./GithubStrategy');
// const Twitter = require('./Twitter');
// const localStrategy = require('./localStrategy');

passport.use(SigninStrategy);
// passport.use('local-signup', SignupStrategy);
// passport.use('local-google', GoogleStrategy);
// passport.use('local-github', GithubStrategy);
// passport.use('local-twitter', Twitter);
// passport.use('local-localStrategy', localStrategy);

module.exports = passport;

