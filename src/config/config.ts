import dotenv from 'dotenv';
import joi from 'joi';
import path from 'path';
import { fileURLToPath } from 'url';

var dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: path.join(dirname, '../../.env') });

var envSchema = joi
  .object()
  .keys({
    NODE_ENV: joi.string().valid('production', 'development', 'test').required(),
    PORT: joi.number().default(3000),
    BASE_PATH: joi.string().default('/api/v1').description('Api version segment'),
    MONGODB_URI: joi.string().required().description('Mongo DB url'),
    DB_NAME: joi.string().required().default('mesto-db'),
    MONGODB_URI_TEST: joi.string().required().description('Mongo test DB url'),
    DB_NAME_TEST: joi.string().default('mesto-db-test'),
  })
  .unknown();

var { value: envVars, error } = envSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`.env file config error: ${error.message}`);
}

var mongoUri = envVars.NODE_ENV === 'test' ? envVars.MONGODB_URI_TEST : envVars.MONGODB_URI;

var dbName = envVars.NODE_ENV === 'test' ? envVars.DB_NAME_TEST : envVars.DB_NAME;

type Config = {
  env: 'production' | 'development' | 'test';
  port: number;
  basePath: string;
  mongoose: {
    uri: string;
    dbName: string;
  };
};

export var config: Config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  basePath: envVars.BASE_PATH,
  mongoose: {
    uri: mongoUri,
    dbName,
  },
};
