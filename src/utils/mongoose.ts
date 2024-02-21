import { NextFunction } from 'express';
import { MongooseError } from 'mongoose';
import { message } from '../messages';

var mongooseErrorType: Record<string, number> = {
  CastError: 404,
  DocumentNotFoundError: 404,
  ValidationError: 400,
};

var getErrorCode = (error: MongooseError) => mongooseErrorType[error.name] || 500;

export var nextFromMongoose = (
  error: MongooseError,
  next: NextFunction,
  customMessage?: string,
) => {
  var code = getErrorCode(error);
  var errorMessage =
    code === 500 && !customMessage ? message.internalServerError() : customMessage || error.message;

  next({ code, message: errorMessage });
};
