/* eslint-disable no-underscore-dangle */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync, formatResponseData, getExpiresInTime } from '#utils';
import { config } from '#config';
import { cookieService, tokenService } from '#services';
import { authService } from './auth.service';

var { secret, accessExpiresIn } = config.jwt;

var login = catchAsync(async (req: Request, res: Response) => {
  var user = await authService.login(req.body);
  // @ts-ignore
  var accessToken = tokenService.generate(user._id, secret, accessExpiresIn);

  cookieService.setTokenCookie(res, 'accessToken', accessToken, getExpiresInTime(accessExpiresIn));

  res.status(200).json(formatResponseData(user));
});

var register = catchAsync(async (req: Request, res: Response) => {
  var newUser = await authService.create(req.body);

  var accessToken = tokenService.generate(newUser._id, secret, accessExpiresIn);

  cookieService.setTokenCookie(res, 'accessToken', accessToken, getExpiresInTime(accessExpiresIn));

  res.status(httpStatus.CREATED).json(formatResponseData(newUser));
});

export var authController = {
  register,
  login,
};
