import Joi from 'joi';
import { message } from '#messages';

export var cardId = Joi.string()
  .alphanum()
  .length(24)
  .messages({
    '*': message.wrongParamId('card'),
  });
