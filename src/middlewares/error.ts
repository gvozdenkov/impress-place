import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import { ApiError } from '#utils';
import { logger } from './logger';

export var errorConverter = (err: any, req: Request, res: Response, next: NextFunction) => {
  var apiError = err;

  if (!(apiError instanceof ApiError)) {
    var statusCode =
      apiError.statusCode || apiError instanceof mongoose.Error
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR;
    var message = apiError.message || httpStatus[statusCode];

    apiError = new ApiError(statusCode, message);
  }

  next(apiError);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export var errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  var { statusCode, message } = err;
  var status =
    statusCode >= httpStatus.BAD_REQUEST && statusCode < httpStatus.INTERNAL_SERVER_ERROR
      ? 'fail'
      : 'error';

  logger.error(err);

  res.status(statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
    status,
    message,
  });
};
