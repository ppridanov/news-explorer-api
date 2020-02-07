const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const limiter = require('./middlewars/limiter');
const { serverErrMsg, baseConnMgs } = require('./middlewars/errors-success-msg');
require('dotenv').config();

const { MONGOOSE_BASEURL } = process.env;

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
  .then(() => console.log(baseConnMgs))
  .catch((err) => console.log(err));

app.use(cookieParser());
app.use('/', require('./routes/index'));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? serverErrMsg
        : message,
    });
});
app.listen(PORT);
