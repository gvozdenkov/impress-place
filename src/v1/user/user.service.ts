import { QueryOptions } from 'mongoose';
import { ServiceReturnPromise } from '#v1/types';
import { User, UserSchema } from './user.model';

var updateOptions: QueryOptions<UserSchema> = {
  returnDocument: 'after',
  runValidators: true,
};

var create = async ({ name, about, avatar }: UserSchema): ServiceReturnPromise => {
  var user = new User({ name, about, avatar });
  var savedUser = await user.save();
  return {
    statusCode: 201,
    data: savedUser,
  };
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
