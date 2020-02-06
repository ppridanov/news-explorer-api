const jwt = require('jsonwebtoken');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
module.exports = (req, res, next) => {
  const cookie = req.cookies.jwt;
  const { authorization } = req.headers;
  if (!authorization) {
    throw new Error('Доступ запрещен. Необходима авторизация');
  }
  let payload;

  try {
    payload = jwt.verify(cookie, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    req.user = payload;
  } catch (err) {
    throw new Error('Доступ запрещен. Необходима авторизация');
  }

  next();
};
