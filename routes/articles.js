const router = require('express').Router();

const { getAllArticles, createArticle, deleteArticle } = require('../controllers/articles');
const auth = require('../middlewars/auth');

router.get('/articles', auth, getAllArticles);
router.post('/articles', auth, createArticle);
router.delete('/articles/:articleId', auth, deleteArticle);

module.exports = router;
