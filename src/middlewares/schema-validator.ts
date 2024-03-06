import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import Joi from 'joi';
import { ApiError } from '#utils';
import { message as errorMessage } from '#messages';

export var schemaValidator =
  (schema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
    var validationResult = schema.validate(req.body);

    if (validationResult.error) {
      var { message, type, context } = validationResult.error.details[0];

      if (type === 'object.unknown') {
        message = errorMessage.notAllowedField(context?.label!);
      }

      throw new ApiError(httpStatus.BAD_REQUEST, message);
    }

    next();
  };
