/* eslint-disable no-underscore-dangle */
import { USER, User, UserDocument } from '../../user';
import { randomeString } from './util';

export var randomeUser = (options = {}) => {
  var name = randomeString(USER.nameMinLength, USER.nameMaxLength);
  var about = randomeString(USER.aboutMinLength, USER.aboutMaxLength);
  var avatar = randomeString(8, 12, ' -');

  return {
    name,
    about,
    avatar: `https://some.site.net/images/${avatar}.jpg`,
    ...(options || {}),
  };
};

export var mapToTestDTO = (item: UserDocument) => ({
  name: item.name,
  about: item.about,
  avatar: item.avatar,
  _id: item._id.toString(),
  createdAt: item.createdAt.toISOString(),
  updatedAt: item.updatedAt.toISOString(),
});

export var createUser = async (options = {}) =>
  // eslint-disable-next-line @typescript-eslint/return-await
  await User.create({
    ...randomeUser(options),
  });
