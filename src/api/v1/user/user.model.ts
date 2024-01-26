import { NextFunction } from 'express';
import { MongooseError, Schema, model } from 'mongoose';
import { modelValidate } from '../middlewares';
import { message } from '../messages';

var schemaOptions = {
  versionKey: false,
  timestamps: true,
};

export type UserSchema = {
  name?: string;
  about?: string;
  avatar?: string;
};

export var USER = {
  nameDefault: 'John Dow',
  nameMaxLength: 30,
  nameMinLength: 2,

  aboutDefault: 'Web Developer',
  aboutMaxLength: 200,
  aboutMinLength: 2,

  avatarDefault: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
} as const;

const userSchema = new Schema<UserSchema>(
  {
    name: {
      type: String,
      default: USER.nameDefault,
      minlength: [USER.nameMinLength, message.minLength(USER.nameMinLength)],
      maxlength: [USER.nameMaxLength, message.maxLength(USER.nameMaxLength)],
      validate: {
        validator: (v: string) => modelValidate.name(v),
        message: message.invalidName(),
      },
    },
    about: {
      type: String,
      default: 'Web Developer',
      minlength: [USER.aboutMinLength, message.minLength(USER.aboutMinLength)],
      maxlength: [USER.aboutMaxLength, message.maxLength(USER.aboutMaxLength)],
    },
    avatar: {
      type: String,
      default: USER.avatarDefault,
      validate: {
        validator: (v: string) => modelValidate.url(v),
        message: message.invalidUrl(),
      },
    },
  },
  schemaOptions,
);

var mongooseErrorType: Record<string, number> = {
  CastError: 404,
  DocumentNotFoundError: 404,
  ValidationError: 400,
};

var getErrorCode = (error: MongooseError) => mongooseErrorType[error.name] || 500;

var nextFromMongo = (error: MongooseError, next: NextFunction, customMessage?: string) => {
  var code = getErrorCode(error);
  var errorMessage =
    code === 500 && !customMessage ? message.internalServerError() : customMessage || error.message;

  next({ code, message: errorMessage });
};

userSchema.post('save', (_error: MongooseError, _doc: any, next: any) =>
  nextFromMongo(_error, next),
);

userSchema.post('findOne', (_error: MongooseError, _doc: any, next: any) =>
  nextFromMongo(_error, next, message.notFound('user')),
);

export var User = model<UserSchema>('User', userSchema);
