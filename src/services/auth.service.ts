/* eslint-disable no-underscore-dangle */
import { message } from '#messages';
import { userService } from '#services';
import { UserSchema } from '#user/user.model';
import { ApiError } from '#utils';
import httpStatus from 'http-status';

var login = async ({ email, password }: UserSchema) => {
  var user = await userService.getByEmail(email);
  var isPasswordMatch = user?.isPasswordMatch(password);

  if (!user && !isPasswordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, message.existsEmail(email));
  }

  return user;
};

export var authService = {
  login,
};
