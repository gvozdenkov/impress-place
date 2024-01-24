import { Schema, model } from 'mongoose';
import { modelValidate } from '../middlewares';

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
      minlength: [USER.nameMinLength, `Must be at least ${USER.nameMinLength}`],
      maxlength: [USER.nameMaxLength, `Should be maximum ${USER.nameMaxLength}`],
      validate: {
        validator: (v: string) => modelValidate.name(v),
        message: '"{VALUE}" is not valid name',
      },
    },
    about: {
      type: String,
      default: 'Web Developer',
      minlength: [USER.aboutMinLength, `Must be at least ${USER.aboutMinLength}`],
      maxlength: [USER.aboutMaxLength, `Should be maximum ${USER.aboutMaxLength}`],
    },
    avatar: {
      type: String,
      default: USER.avatarDefault,
      validate: {
        validator: (v: string) => modelValidate.url(v),
        message: '"{VALUE}" is not valid url',
      },
    },
  },
  schemaOptions,
);

export var User = model<UserSchema>('User', userSchema);
