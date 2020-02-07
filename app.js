const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const limiter = require('./middlewars/limiter');
require('dotenv').config();

const { MONGOOSE_BASEURL } = process.env;
const { createUser, login } = require('./controllers/users');

const { PORT = 3000 } = process.env;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet.xssFilter());
app.use(helmet.frameguard());
app.use(limiter);
mongoose.connect(MONGOOSE_BASEURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .then(() => console.log('Base connected'))
  .catch((err) => console.log(err));

app.use(cookieParser());
app.post('/signup', createUser);
app.post('/signin', login);
app.use('/', require('./routes/articles'));
app.use('/', require('./routes/users'));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'Произошла ошибка, обратитесь к администратору'
        : message,
    });
});
app.listen(PORT);
