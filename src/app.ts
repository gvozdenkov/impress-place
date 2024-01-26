import express, { Application } from 'express';
import cors from 'cors';
import { BASE_PATH, connectDb, router } from '#api/v1';
import { auth, errorHandler, promiseMiddleware } from '#api/v1/middlewares';

connectDb();

var PORT = process.env.PORT || 3000;

var app: Application = express();

// @ts-ignore
app.use(promiseMiddleware());
app.use(auth);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(BASE_PATH, router);

// @ts-ignore
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}, http://localhost:${PORT}${BASE_PATH}`);
});
