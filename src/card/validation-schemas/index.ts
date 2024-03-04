import Joi from 'joi';
import { name, link } from './fields';

export var createCard = Joi.object({
  name,
  link,
});
