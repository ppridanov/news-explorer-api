// Переменные
const router = require('express').Router();
const { getAllArticles, createArticle, deleteArticle } = require('../controllers/articles');
const auth = require('../middlewars/auth');
const { articleCreateValidator } = require('../middlewars/validator');

// Роуты новостей
router.get('/articles', auth, getAllArticles);
router.post('/articles', auth, articleCreateValidator, createArticle);
router.delete('/articles/:articleId', auth, deleteArticle);

module.exports = router;
