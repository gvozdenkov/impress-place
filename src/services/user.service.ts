import { QueryOptions } from 'mongoose';
import httpStatus from 'http-status';
import { ApiError } from '#utils';
import { message } from '#messages';
import { User, UserSchema } from '../user/user.model';

var updateOptions: QueryOptions<UserSchema> = {
  returnDocument: 'after',
  runValidators: true,
};

var create = async ({ name, about, avatar, email, password }: UserSchema) => {
  if (await User.isEmailTaken(email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, message.existsEmail(email));
  }

  return User.create({ name, about, avatar, email, password });
};

var getAll = async () => await User.find({}).orFail();

var getById = async (id: string) => await User.findById(id).orFail();

var getByEmail = async (email: string) => await User.findOne({ email });

var updateMe = async (id: string, { name, about }: UserSchema) =>
  await User.findByIdAndUpdate(id, { name, about }, updateOptions).orFail();

var updateMeAvatar = async (id: string, { avatar }: UserSchema) =>
  await User.findByIdAndUpdate(id, { avatar }, updateOptions).orFail();

export var userService = {
  create,
  getAll,
  getById,
  getByEmail,
  updateMe,
  updateMeAvatar,
};
