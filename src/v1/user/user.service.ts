import { QueryOptions } from 'mongoose';
import { User, UserSchema } from './user.model';

var updateOptions: QueryOptions<UserSchema> = {
  returnDocument: 'after',
  runValidators: true,
};

var create = async ({ name, about, avatar }: UserSchema) => {
  var user = new User({ name, about, avatar });
  return user.save();
};

var getAll = async () => User.find({}).lean();

var getById = async (id: string) => User.findById(id).orFail();

var updateMe = async (id: string, { name, about }: UserSchema) =>
  User.findByIdAndUpdate(id, { name, about }, updateOptions).orFail();

var updateMeAvatar = async (id: string, { avatar }: UserSchema) =>
  User.findByIdAndUpdate(id, { avatar }, updateOptions).orFail();

export var userService = {
  create,
  getAll,
  getById,
  updateMe,
  updateMeAvatar,
};
