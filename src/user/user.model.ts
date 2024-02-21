import { HydratedDocument, Model, MongooseError, Schema, model } from 'mongoose';
import { compare, hash } from 'bcrypt';
import { modelValidate } from '../middlewares';
import { message } from '../messages';
import { nextFromMongoose } from '../utils';

var schemaOptions = {
  versionKey: false,
  timestamps: true,
};

export type UserSchema = {
  name?: string;
  about?: string;
  avatar?: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

interface UserMethods {
  isPasswordMatch: (password: string) => Promise<boolean>;
}

interface UserModel extends Model<UserSchema, {}, UserMethods> {
  isEmailTaken(
    email: string,
    excludeUserId?: string,
  ): Promise<HydratedDocument<UserSchema, UserMethods>>;
}

export var USER = {
  nameDefault: 'John Dow',
  nameMaxLength: 30,
  nameMinLength: 2,

  aboutDefault: 'Web Developer',
  aboutMaxLength: 200,
  aboutMinLength: 2,

  avatarDefault: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
} as const;

const userSchema = new Schema<UserSchema, UserModel, UserMethods>(
  {
    name: {
      type: String,
      trim: true,
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
      trim: true,
      default: USER.aboutDefault,
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
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (v: string) => modelValidate.email(v),
        message: message.invalidEmail(),
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      select: false,
    },
  },
  schemaOptions,
);

userSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.createdAt;
  delete obj.updatedAt;
  delete obj.password;
  return obj;
};

userSchema.methods.isPasswordMatch = async function (password: string) {
  return compare(password, this.password);
};

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  var user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

userSchema.pre('save', async function hashChengedPassword(next) {
  if (this.isModified('password')) {
    this.password = await hash(this.password, 10);
  }

  next();
});

userSchema.post('save', (_error: MongooseError, _doc: any, next: any) =>
  nextFromMongoose(_error, next),
);

userSchema.post('findOne', (_error: MongooseError, _doc: any, next: any) =>
  nextFromMongoose(_error, next, message.notFound('user')),
);

userSchema.post('findOneAndUpdate', (_error: MongooseError, _doc: any, next: any) =>
  nextFromMongoose(_error, next, _error.message),
);

export var User = model<UserSchema, UserModel>('User', userSchema);

export type UserDocument = InstanceType<typeof User>;
