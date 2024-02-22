/* eslint-disable no-underscore-dangle */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync, formatResponseData } from '#utils';
import { authService, cookieService, tokenService, userService } from '#services';
import { config } from '#config';

var { secret, accessExpired } = config.jwt;

var login = catchAsync(async (req: Request, res: Response) => {
  var user = await authService.login(req.body);
  // @ts-ignore
  var accessToken = tokenService.generate(user._id, secret);

  cookieService.setTokenCookie(res, 'accessToken', accessToken, accessExpired);

  res.status(200).send(formatResponseData(user));
});

var register = catchAsync(async (req: Request, res: Response) => {
  var newUser = await userService.create(req.body);

  var accessToken = tokenService.generate(newUser._id, secret);

  cookieService.setTokenCookie(res, 'accessToken', accessToken, accessExpired);

  res.status(httpStatus.CREATED).send(formatResponseData(newUser));
});

export var authController = {
  register,
  login,
};
