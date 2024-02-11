import express, { Application } from 'express';
import cors from 'cors';
import { connectDb, router } from '#v1';
import { auth, errorHandler, promiseMiddleware } from '#v1/middlewares';
import { config } from '#v1/config';

connectDb();

export var app: Application = express();

// @ts-ignore
app.use(promiseMiddleware());
app.use(auth);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(config.basePath, router);

// @ts-ignore
app.use(errorHandler);
