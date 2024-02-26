import express, { Application } from 'express';
import cors from 'cors';
import httpStatus from 'http-status';
import cookieParser from 'cookie-parser';
import { routerV1 } from '#v1';
import { errorConverter, errorHandler } from '#middlewares';
import { config } from '#config';
import { connectDb } from '#mongo-connect';
import { ApiError } from '#utils';

var { basePath } = config;

connectDb();

export var app: Application = express();

app.use(cookieParser());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`${basePath}/v1`, routerV1);

// 404 error for any unknown request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert any error to ApiError
app.use(errorConverter);

app.use(errorHandler);
