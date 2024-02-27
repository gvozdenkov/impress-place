/* eslint-disable no-underscore-dangle */
import { NextFunction, Request, Response } from 'express';
import { config } from '#config';
import { ApiError, catchAsync } from '#utils';
import httpStatus from 'http-status';
import { message } from '#messages';
import { tokenService } from '#services';

var { secret } = config.jwt;

export var auth = catchAsync((req: Request, res: Response, next: NextFunction) => {
  var { accessToken } = req.cookies;

  if (!accessToken) {
    throw new ApiError(httpStatus.UNAUTHORIZED, message.unauthorized());
  }

  var user = tokenService.verify(accessToken, secret);

  req.userId = user._id;

  next();
});
