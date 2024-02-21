import { QueryOptions } from 'mongoose';
import { User, UserSchema } from '../user/user.model';

var updateOptions: QueryOptions<UserSchema> = {
  returnDocument: 'after',
  runValidators: true,
};

var getAll = async () => await User.find({}).orFail();

var getById = async (id: string) => await User.findById(id).orFail();

var updateMe = async (id: string, { name, about }: UserSchema) =>
  await User.findByIdAndUpdate(id, { name, about }, updateOptions).orFail();

var updateMeAvatar = async (id: string, { avatar }: UserSchema) =>
  await User.findByIdAndUpdate(id, { avatar }, updateOptions).orFail();

export var userService = {
  getAll,
  getById,
  updateMe,
  updateMeAvatar,
};
