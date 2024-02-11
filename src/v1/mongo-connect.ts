import mongoose from 'mongoose';
import { config } from './config';

var { uri, dbName } = config.mongoose;
var { env } = config;

var options = {
  dbName,
};

export var connectDb = () => {
  if (env !== 'development') {
    // eslint-disable-next-line no-console
    console.log(`
    \n===> start connection to mongodb...
    \nNODE_ENV=${env}
    \ndbURI=${uri}
    \ndbName=${dbName}`);
  }
  mongoose
    .connect(uri, options)
    // eslint-disable-next-line no-console
    .then(() => console.log(`Mongodb connected to ${dbName} (NODE_ENV=${env})...`))
    // eslint-disable-next-line no-console
    .catch((e) => console.log('Mongodb connection error', e.message));
};

mongoose.connection.on('disconnected', () => {
  // eslint-disable-next-line no-console
  console.log('Mongoose connection is disconnected.');
});
