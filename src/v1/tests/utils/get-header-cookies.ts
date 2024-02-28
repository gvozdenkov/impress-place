/* eslint-disable import/no-extraneous-dependencies */
import request, { Response } from 'supertest';
import { app } from '#app';
import { basePathV1 } from '#v1';

type Credentials = {
  email: string;
  password: string;
};

var loginTestUser = ({ email, password }: Credentials) =>
  request(app).post(`${basePathV1}/signin`).send({ email, password });

var getCookies = (req: ReturnType<typeof loginTestUser>) =>
  req.then((res: Response) => res.header['set-cookie']);

export var getReqCookies = ({ email, password }: Credentials) =>
  getCookies(loginTestUser({ email, password }));
