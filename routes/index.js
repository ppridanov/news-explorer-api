// Переменные
const router = require('express').Router();
const { getAllArticles, createArticle, deleteArticle } = require('../controllers/articles');
const { getUser, createUser, login } = require('../controllers/users');
const auth = require('../middlewars/auth');
const { articleCreateValidator, newUserValidator, loginValidator } = require('../middlewars/validator');

// Роуты новостей
router.get('/articles', auth, getAllArticles);
router.post('/articles', auth, articleCreateValidator, createArticle);
router.delete('/articles/:articleId', auth, deleteArticle);

// Роуты пользователей
router.get('/users/me', auth, getUser);


// Роуты регистрациии и входа
router.post('/signup', newUserValidator, createUser);
router.post('/signin', loginValidator, login);

module.exports = router;
