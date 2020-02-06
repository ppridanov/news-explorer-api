const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const { createUser, login } = require('./controllers/users');

const { PORT = 3000 } = process.env;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect('mongodb://localhost:27017/newsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .then(() => {
    console.log('Mongodb connected');
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
app.use((req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133',
  };

  next();
});
app.use(cookieParser());
app.post('/signup', createUser);
app.post('/signin', login);
app.use('/', require('./routes/articles'));
app.use('/', require('./routes/users'));

app.listen(PORT);
