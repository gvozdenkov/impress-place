import Joi from 'joi';
import { name, about, avatar, email, password } from './fields';

export var createUser = Joi.object({
  name,
  about,
  avatar,
  email,
  password,
});

export var loginUser = Joi.object({
  email,
  password,
});

export var updateUser = Joi.object({
  name,
  about,
});

export var updateAvatar = Joi.object({
  avatar,
});
