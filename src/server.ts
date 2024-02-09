import http from 'http';
import { BASE_PATH, app } from '#app';

var PORT = process.env.PORT || 3000;

var testServer = http.createServer(app);

testServer.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Test server running on port ${PORT}, http://localhost:${PORT}${BASE_PATH}`);
});
