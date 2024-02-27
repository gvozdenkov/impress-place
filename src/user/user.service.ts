import { QueryOptions } from 'mongoose';
import { UserId } from '#types';
import { User, UserSchema } from './user.model';

var updateOptions: QueryOptions<UserSchema> = {
  returnDocument: 'after',
  runValidators: true,
};

var getAll = async () => await User.find({}).orFail();

var getById = async (id: UserId) => await User.findById(id).orFail();

var updateMe = async (id: UserId, { name, about }: UserSchema) =>
  await User.findByIdAndUpdate(id, { name, about }, updateOptions).orFail();

var updateMeAvatar = async (id: UserId, { avatar }: UserSchema) =>
  await User.findByIdAndUpdate(id, { avatar }, updateOptions).orFail();

export var userService = {
  getAll,
  getById,
  updateMe,
  updateMeAvatar,
};
