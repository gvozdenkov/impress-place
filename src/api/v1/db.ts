import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export var dbName =
  process.env.NODE_ENV === 'testing' ? process.env.DB_NAME_TEST : process.env.DB_NAME;

var options = {
  dbName,
};

export var connectDb = () => {
  mongoose
    .connect(process.env.MONGODB_URI!, options)
    // eslint-disable-next-line no-console
    .then(() => console.log(`Mongodb connected to ${dbName} (NODE_ENV=${process.env.NODE_ENV})...`))
    // eslint-disable-next-line no-console
    .catch((e) => console.log('Mongodb connection error', e.message));
};

mongoose.connection.on('disconnected', () => {
  // eslint-disable-next-line no-console
  console.log('Mongoose connection is disconnected.');
});
