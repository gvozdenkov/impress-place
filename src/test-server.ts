import http from 'http';
import { BASE_PATH, app } from '#app';

var PORT = process.env.TEST_PORT || 3001;

var testServer = http.createServer(app);

testServer.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Test server running on port ${PORT}, http://localhost:${PORT}${BASE_PATH}`);
});
