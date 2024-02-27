import { Response } from 'express';
import { TokenType } from '#types';
import { config } from '#config';

var { env } = config;

var setTokenCookie = (res: Response, type: TokenType, token: string, expires: Date) =>
  res.cookie(type, token, {
    secure: env === 'production',
    httpOnly: true,
    expires,
  });

export var cookieService = {
  setTokenCookie,
};
