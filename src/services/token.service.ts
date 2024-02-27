import jwt from 'jsonwebtoken';
import { UserId } from '#types';

var generate = (userId: UserId, secret: string, expiresIn: number) =>
  jwt.sign({ _id: userId }, secret, { expiresIn });

var verify = (token: string, secret: string) => <{ _id: UserId }>jwt.verify(token, secret);

export var tokenService = {
  generate,
  verify,
};
