import http from 'http';
import { app } from '#app';
import { config } from '#config';

var { port: PORT, basePath: BASE_PATH } = config;

var testServer = http.createServer(app);

testServer.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}, http://localhost:${PORT}${BASE_PATH}`);
});
