import Joi from 'joi';
import { message } from '#messages';
import { CARD } from '../card.model';

export var name = Joi.string()
  .min(CARD.nameMinLength)
  .max(CARD.nameMaxLength)
  .required()
  .messages({
    'string.min': message.minLength('name', CARD.nameMinLength),
    'string.max': message.maxLength('name', CARD.nameMaxLength),
    'any.required': message.requiedField('name'),
  });

export var link = Joi.string()
  .uri()
  .required()
  .messages({
    'string.uri': message.invalidUrl('link'),
    'any.required': message.requiedField('link'),
  });
