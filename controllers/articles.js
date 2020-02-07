// Переменные
const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-error');
const AccessError = require('../errors/access-error');

module.exports.getAllArticles = (req, res, next) => {
  const ownerId = req.user._id;
  Article.find({ owner: ownerId })
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
        throw new NotFoundError('Не найден идентификатор с таким ID');
      }
      if (article.owner.toString() !== ownerId) {
        throw new AccessError('У вас нет доступа к удалению чужих карточек ');
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
