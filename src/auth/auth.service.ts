/* eslint-disable no-underscore-dangle */
import { message } from '#messages';
import { User, UserSchema } from '#user/user.model';
import { ApiError } from '#utils';
import httpStatus from 'http-status';

var getUserByEmail = async (email: string) => await User.findOne({ email }).select('+password');

var create = async ({ name, about, avatar, email, password }: UserSchema) => {
  if (await User.isEmailTaken(email)) {
    throw new ApiError(httpStatus.CONFLICT, message.existsEmail(email));
  }

  return User.create({ name, about, avatar, email, password });
};

var login = async ({ email, password }: UserSchema) => {
  var user = await getUserByEmail(email);

  var isPasswordMatch = await user?.isPasswordMatch(password);

  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, message.invalidEmailOrPwd());
  }

  return user;
};

export var authService = {
  create,
  login,
};
