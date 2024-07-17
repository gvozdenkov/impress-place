import http from 'http';
import { app } from '#app';
import { config } from '#config';

var { port: PORT, basePath: BASE_PATH } = config;

var server = http.createServer(app);

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`\nServer running on port ${PORT}, http://localhost:${PORT}${BASE_PATH}/v1
    \nSwagger OpenAPI specification on http://localhost:${PORT}${BASE_PATH}/v1/docs/ru`);
});
