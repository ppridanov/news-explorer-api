const { celebrate, Joi } = require('celebrate');

module.exports.newUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(2)
      .max(30)
      .label('Проверьте правильность введенного имени'),
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: false } })
      .label('Проверьте правильность введенного адреса электронной почты'),
    password: Joi.string()
      .required()
      .min(8)
      .pattern(/^[a-zA-Z0-9]{3,30}$/)
      .label('Проверьте правильность введенного пароля. Пароль должен содержать не менее 8 символов'),
  }),
});


module.exports.loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: false } })
      .label('Проверьте правильность введенного адреса электронной почты'),
    password: Joi.string()
      .required()
      .min(8)
      .pattern(/^[a-zA-Z0-9]{3,30}$/)
      .label('Проверьте правильность введенного пароля. Пароль должен содержать не менее 8 символов'),
  }),
});

module.exports.articleCreateValidator = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string()
      .required()
      .min(2)
      .max(30)
      .label('Проверьте правильность введенных данных'),
    title: Joi.string()
      .required()
      .min(2)
      .max(30)
      .label('Проверьте правильность введенных данных'),
    text: Joi.string()
      .required()
      .min(2)
      .max(30)
      .label('Проверьте правильность введенных данных'),
    date: Joi.string()
      .required()
      .min(2)
      .max(30)
      .label('Проверьте правильность введенных данных'),
    source: Joi.string()
      .required()
      .min(2)
      .max(30)
      .label('Проверьте правильность введенных данных'),
    link: Joi.string()
      .required()
      .pattern(/^https?:\/\//)
      .label('Проверьте правильность введеного URL ссылки на новость'),
    image: Joi.string()
      .required()
      .pattern(/^https?:\/\//)
      .label('Проверьте правильность введеного URL ссылки на картинку'),
  }),
});
