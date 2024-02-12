import mongoose from 'mongoose';

export var setupTestDB = () => {
  beforeEach(async () => {
    await Promise.all(
      Object.values(mongoose.connection.collections).map(async (collection) =>
        collection.deleteMany(),
      ),
    );
  });
};
