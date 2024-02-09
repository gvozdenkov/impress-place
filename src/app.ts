import express, { Application } from 'express';
import cors from 'cors';
import { connectDb, router } from '#v1';
import { auth, errorHandler, promiseMiddleware } from '#v1/middlewares';

connectDb();

export var BASE_PATH = process.env.BASE_PATH || '/api/v1';

export var app: Application = express();

// @ts-ignore
app.use(promiseMiddleware());
app.use(auth);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(BASE_PATH, router);

// @ts-ignore
app.use(errorHandler);
