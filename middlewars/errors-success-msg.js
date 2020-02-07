// Успешные сообщения
const userCreatedMsg = 'Пользователь успешно создан';
const userJoinMsg = 'Успешный вход';
const baseConnMgs = 'MongoDB успешно подключена';

// Сообщения об ошибке
const notFoundIdMsg = 'Не найден идентификатор с таким ID';
const emailNotUniqueMsg = 'Такой почтовый ящик уже существует';
const passNotValidMsg = 'Пароль должен содержать не менее 8 символов';
const accessErrMsg = 'У вас нет доступа к удалению чужих карточек';
const notValidMsg = 'Проверьте правильность ввода учетных данных';
const serverErrMsg = 'Произошла ошибка, обратитесь к администратору';


module.exports = {
  userCreatedMsg,
  userJoinMsg,
  baseConnMgs,
  notFoundIdMsg,
  emailNotUniqueMsg,
  accessErrMsg,
  notValidMsg,
  passNotValidMsg,
  serverErrMsg,
};
