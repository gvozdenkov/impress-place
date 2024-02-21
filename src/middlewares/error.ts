import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import { ApiError } from '#utils';

export var errorConverter = (err: any, req: Request, res: Response, next: NextFunction) => {
  var apiError;

  if (!(err instanceof ApiError)) {
    var statusCode =
      err.statusCode || err instanceof mongoose.Error
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR;
    var message = err.message || httpStatus[statusCode];

    apiError = new ApiError(statusCode, message);
  }
  next(apiError);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export var errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  var { statusCode, message } = err;

  statusCode = httpStatus.INTERNAL_SERVER_ERROR;

  res.status(statusCode).send({
    status: 'fail',
    message,
  });
};
