import { QueryOptions } from 'mongoose';
import { ServiceReturnPromise } from '#v1/types';
import { serviceReturn } from '#v1/helpers';
import { User, UserSchema } from './user.model';

var updateOptions: QueryOptions<UserSchema> = {
  returnDocument: 'after',
  runValidators: true,
};

var create = async ({ name, about, avatar }: UserSchema): ServiceReturnPromise => {
  var user = new User({ name, about, avatar });
  var savedUser = await user.save();
  return serviceReturn(savedUser, 201);
};

var getAll = async () => serviceReturn(await User.find({}).lean());

var getById = async (id: string) => serviceReturn(await User.findById(id).orFail());

var updateMe = async (id: string, { name, about }: UserSchema) =>
  serviceReturn(await User.findByIdAndUpdate(id, { name, about }, updateOptions).orFail());

var updateMeAvatar = async (id: string, { avatar }: UserSchema) =>
  serviceReturn(await User.findByIdAndUpdate(id, { avatar }, updateOptions).orFail());

export var userService = {
  create,
  getAll,
  getById,
  updateMe,
  updateMeAvatar,
};
