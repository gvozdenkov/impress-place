import express from 'express';

var app = express();

var port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Home Route');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${port}, http://localhost:${port}`);
});
