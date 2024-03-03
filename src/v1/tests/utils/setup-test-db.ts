import mongoose from 'mongoose';

export var testUserOne = {
  name: 'Test User One',
  about: 'Test User One about',
  avatar: 'https://some.site.com/images/avatar_one.jpg',
  email: 'test-user-one@mail.com',
  password: 'test-user-one-password',
};

export var testUserTwo = {
  name: 'Test User Two',
  about: 'Test User Two about',
  avatar: 'https://some.site.com/images/avatar_two.jpg',
  email: 'test-user-two@mail.com',
  password: 'test-user-two-password',
};

export var testCardOne = {
  name: 'Test Card One',
  link: 'https://some.site.com/images/card_one.jpg',
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
