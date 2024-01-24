import { User, UserSchema } from './user.model';

var getAll = () => User.find({});

var getById = (id: string) => User.findById(id);

var create = ({ name, about, avatar }: UserSchema) => {
  var user = new User({ name, about, avatar });
  return user.save();
};

export var userService = {
  create,
  getAll,
  getById,
};
