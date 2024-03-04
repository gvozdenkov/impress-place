import Joi from 'joi';
import { message } from '#messages';
import { nameRegex } from '#utils';
import { USER } from '#user/user.model';

export var name = Joi.string()
  .min(USER.nameMinLength)
  .max(USER.nameMaxLength)
  .pattern(nameRegex)
  .default(USER.nameDefault)
  .messages({
    'string.min': message.minLength('name', USER.nameMinLength),
    'string.max': message.maxLength('name', USER.nameMaxLength),
    'string.pattern.base': message.invalidInput('name'),
  });

export var about = Joi.string()
  .min(USER.aboutMinLength)
  .max(USER.aboutMaxLength)
  .default(USER.aboutDefault)
  .messages({
    'string.min': message.minLength('name', USER.nameMinLength),
    'string.max': message.maxLength('name', USER.nameMaxLength),
  });

export var avatar = Joi.string()
  .uri()
  .default(USER.avatarDefault)
  .messages({
    'string.uri': message.invalidUrl('avatar'),
  });

export var email = Joi.string()
  .email()
  .required()
  .messages({
    'any.required': message.requiedField('email'),
    'string.email': message.invalidEmail('email'),
  });

export var password = Joi.string()
  .required()
  .messages({
    'any.required': message.requiedField('password'),
  });
