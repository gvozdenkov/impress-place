import jwt from 'jsonwebtoken';
import { MongoObjectID } from '#types';

var generate = (userId: string | MongoObjectID, secret: string) =>
  jwt.sign({ _id: userId }, secret);

export var tokenService = {
  generate,
};
