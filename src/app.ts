import express, { Application } from 'express';
import { BASE_PATH, router } from '#api/v1';

var app: Application = express();

var PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(BASE_PATH, router);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}, http://localhost:${PORT}`);
});
