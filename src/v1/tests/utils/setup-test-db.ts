import mongoose from 'mongoose';
import { USER } from '#user';

export var testDefaultUser = {
  name: USER.nameDefault,
  about: USER.aboutDefault,
  avatar: USER.avatarDefault,
  email: 'default@mail.com',
  password: 'default-password',
};

export var setupTestDB = () => {
  beforeEach(async () => {
    await Promise.all(
      Object.values(mongoose.connection.collections).map(async (collection) =>
        collection.deleteMany(),
      ),
    );
  });
};
