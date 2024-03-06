import Joi from 'joi';
import { name, link } from './fields';
import { cardId } from './params';

export var createCard = Joi.object({
  name,
  link,
});

export var cardIdParam = Joi.object({
  cardId,
});
