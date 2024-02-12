import { MongooseError, Schema, model } from 'mongoose';
import { modelValidate } from '../middlewares';
import { message } from '../messages';
import { nextFromMongoose } from '../helpers';

var schemaOptions = {
  versionKey: false,
  timestamps: true,
};

export type UserSchema = {
  name: string;
  about: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
};

export var USER = {
  nameMaxLength: 30,
  nameMinLength: 2,

  aboutMaxLength: 200,
  aboutMinLength: 2,
} as const;

const userSchema = new Schema<UserSchema>(
  {
    name: {
      type: String,
      minlength: [USER.nameMinLength, message.minLength(USER.nameMinLength)],
      maxlength: [USER.nameMaxLength, message.maxLength(USER.nameMaxLength)],
      required: true,
      validate: {
        validator: (v: string) => modelValidate.name(v),
        message: message.invalidName(),
      },
    },
    about: {
      type: String,
      required: true,
      minlength: [USER.aboutMinLength, message.minLength(USER.aboutMinLength)],
      maxlength: [USER.aboutMaxLength, message.maxLength(USER.aboutMaxLength)],
    },
    avatar: {
      type: String,
      required: true,
      validate: {
        validator: (v: string) => modelValidate.url(v),
        message: message.invalidUrl(),
      },
    },
  },
  schemaOptions,
);

userSchema.post('save', (_error: MongooseError, _doc: any, next: any) =>
  nextFromMongoose(_error, next),
);

userSchema.post('findOne', (_error: MongooseError, _doc: any, next: any) =>
  nextFromMongoose(_error, next, message.notFound('user')),
);

userSchema.post('findOneAndUpdate', (_error: MongooseError, _doc: any, next: any) =>
  nextFromMongoose(_error, next, _error.message),
);

export var User = model<UserSchema>('User', userSchema);

export type UserDocument = InstanceType<typeof User>;
