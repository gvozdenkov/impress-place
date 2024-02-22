import { Response } from 'express';
import { TokenType } from '#types';

var setTokenCookie = (res: Response, type: TokenType, token: string, expiresTime: number) => {
  var currentDate = new Date();
  var accessTokenExpires = new Date(currentDate.getTime() + expiresTime);

  res.cookie(type, token, {
    secure: true,
    httpOnly: true,
    expires: accessTokenExpires,
  });
};

export var cookieService = {
  setTokenCookie,
};
