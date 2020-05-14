require('dotenv').config();
const bodyParser = require('body-parser');

const expressValidator = require('express-validator');

var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const express = require('express');
const app = express();


app.use(cookieParser()); // Add this after you initialize express.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Add after body parser initialization!
app.use(expressValidator());

app.use(express.static('public'));

// Set db
require('./data/frogfacts-db');

var checkAuth = (req, res, next) => {
  console.log("Checking authentication");
  if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
    req.user = null;
  } else {
    var token = req.cookies.nToken;
    var decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }

  next();
};
app.use(checkAuth);

// app.use((req, res, next) => {
//   const err = new Error(`${req.method} ${req.url} Not Found`);
//   err.status = 404;
//   next(err);
// });
// app.use((err, req, res, next) => {
//   console.error(err);
//   res.status(err.status || 500);
//   res.json({
//     error: {
//       message: err.message,
//     },
//   });
// });

require('./controllers/fact')(app);
require('./controllers/auth.js')(app);

app.listen(process.env.PORT, () => {
    console.log(`server started on port ${process.env.PORT} (${process.env.NODE_ENV})`); // eslint-disable-line no-console
  });

module.exports = app;