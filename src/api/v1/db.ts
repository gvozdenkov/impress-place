import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

var options = {
  dbName: process.env.DB_NAME,
};

export var connectDb = () => {
  mongoose
    .connect(process.env.MONGODB_URL!, options)
    // eslint-disable-next-line no-console
    .then(() => console.log('Mongodb connected...'))
    // eslint-disable-next-line no-console
    .catch((e) => console.log(e.message));
};

mongoose.connection.on('connected', () => {
  // eslint-disable-next-line no-console
  console.log('Mongoose connected to db...');
});

mongoose.connection.on('disconnected', () => {
  // eslint-disable-next-line no-console
  console.log('Mongoose connection is disconnected.');
});
