var express = require('express');
var logger = require('morgan');

var cors = require('cors');
var mongoose = require('mongoose');

// var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var eventsRouter = require("./routes/events");
var ticketsRouter = require("./routes/tickets");
var photosRouter = require('./routes/photos');
var cartRouter = require('./routes/carts');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('trust proxy', 1);
app.enable('trust proxy');

app.use(
    cors({
      origin: [process.env.REACT_APP_URI]  // <== URL of our future React app
    })
  );

// app.use(
//     cors()
//   );

// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use("/events", eventsRouter);
app.use("/tickets", ticketsRouter);
app.use("/photos", photosRouter);
app.use("/cart", cartRouter);

mongoose
  .connect(process.env.MONGODB_URI)
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));

module.exports = app;
