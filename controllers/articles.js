// Переменные
const Article = require('../models/article');

module.exports.getAllArticles = (req, res, next) => {
  Article.find({})
    .then((article) => {
      res.send(article);
    })
    .catch(next);
};

// Создаем новость
module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const ownerId = req.user._id;
  console.log(ownerId)
  Article.create({
    keyword, title, text, date, source, link, image, owner: ownerId,
  })
    .then((article) => {
      res.send(article);
    })
    .catch(next);
};

// Удаляем новость
module.exports.deleteArticle = (req, res, next) => {
  const { articleId } = req.params;
  const ownerId = req.user._id;
  Article.findById(articleId).select('+owner')
    .then((article) => {
      if (!article) {
        throw new Error('Не найден идентификатор с таким ID');
      }
      if (!article.owner.toString() === ownerId) {
        throw new NotHaveAccess();
      }
      Article.findByIdAndRemove(articleId)
        .then((article) => {
          if (!article) {
            throw new NotFoundError('Не найден идентификатор с таким ID');
          }
          res.send(article);
        })
        .catch(next);
    })
    .catch(next);
};