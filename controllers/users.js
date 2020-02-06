// Переменные
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const BadRequest = require('../errors/bad-request-error');

const { NODE_ENV, JWT_SECRET } = process.env;


// Создание пользователя
module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        about: req.body.about,
        avatar: req.body.avatar,
      }, (err, user) => {
        try {
          if (err != undefined || user == undefined) {
            if (err.code === 11000) {
              next(new BadRequest('Такой почтовый ящик уже существует'));
              return;
            }
            next(new BadRequest('Проверьте правильность введенных данных'));
          }
          res.send({ message: 'Пользователь успешно создан' });
        } catch (err) {
          next(err);
        }
      });
    });
};

// Вход пользователя
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  let userId = '';
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new BadRequest('Проверьте правильность ввода учетных данных');
      }
      userId = user._id;
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        throw new BadRequest('Проверьте правильность ввода учетных данных');
      }
      const token = jwt.sign({ _id: userId }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res
        .status(200)
        .cookie('jwt', token, {
          maxAge: 3600000,
          httpOnly: true,
          sameSite: true,
        })
        .send({ message: 'Успешный вход' })
        .end();
    })
    .catch(next);
};

// Получить своего пользователя
module.exports.getUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId, (err, user) => {
    try {
      if (err != undefined || user == undefined) {
        throw new NotFoundError('Пользователь с такий ID не найден');
      }
      res.send(user);
    } catch (err) {
      next(err);
    }
  });
};
