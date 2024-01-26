import express, { Application } from 'express';
import cors from 'cors';
import { BASE_PATH, connectDb, router } from '#api/v1';
import { promiseMiddleware } from '#api/v1/middlewares';

var app: Application = express();

// @ts-ignore
app.use(promiseMiddleware());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDb();

app.use(BASE_PATH, router);

var PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}, http://localhost:${PORT}${BASE_PATH}`);
});
