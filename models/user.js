const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неверный формат почты.',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
},
{
  versionKey: false,
});


// создаём модель и экспортируем её
module.exports = mongoose.model('user', userSchema);
