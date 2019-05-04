
const express = require('express');
// const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('./passport');
const cookieSession = require('cookie-session');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const PORT = process.env.PORT || 8081;
const log = console.log;
const app = express();
mongoose.connect('mongodb://localhost/myManager', { useNewUrlParser: true }).then(
  () => { console.log('Connected database') },
  (error) => { console.log('failed to connect to database') }
);
const bodyParser = require('body-parser');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/authentication', usersRouter);



app.listen(PORT, () => {
  log('Server is listening on PORT ${PORT}');
});

module.exports = app;
