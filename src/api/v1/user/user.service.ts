import { User, UserSchema } from './user.model';

var getAll = () => User.find({});

var getById = (id: string) => User.findById(id);

var create = ({ name, about, avatar }: UserSchema) => {
  var user = new User({ name, about, avatar });
  return user.save();
};

var updateMe = async (id: string, { name, about }: UserSchema) =>
  User.findByIdAndUpdate(
    id,
    { name, about },
    {
      returnDocument: 'after',
      runValidators: true,
    },
  ).orFail();

var updateMeAvatar = async (id: string, { avatar }: UserSchema) =>
  User.findByIdAndUpdate(
    id,
    { avatar },
    {
      returnDocument: 'after',
      runValidators: true,
    },
  ).orFail();

export var userService = {
  create,
  getAll,
  getById,
  updateMe,
  updateMeAvatar,
};
