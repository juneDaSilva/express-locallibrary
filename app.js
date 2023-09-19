require('dotenv').config();
const express = require('express');
const createError = require('http-errors');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const catalogRouter = require('./routes/catalog');
const expressLayouts = require('express-ejs-layouts');
const compression = require('compression'); // to compress HTTP response sent back to client. reducing time require for client to get and load page
const helmet = require('helmet');

const app = express();

// Set up rate limiter: maximim of twenty requests per minute
const RateLimit = require('express-rate-limit');
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,
});

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
async function main() {
  await mongoose.connect(process.env.KEY);
}
main().catch((err) => console.log(err));

app.set('view engine', 'ejs');

// MIDDLEWWARE & STATIC FILES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressLayouts);
app.use(express.static('public'));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);
app.use(compression()); // compress all routes
//Set Content Security Policy (CSP) headers to allow our Bootstrap and Jquery to be served
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      'script-src': ["'self'", 'code.jquery.com', 'cdn.jsdelivr.net'],
    },
  })
);
app.use(limiter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`listening for requests on port ${PORT}`);
});
