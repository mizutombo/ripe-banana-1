const app = require('./lib/app');
require('./lib/connection');
const http = require('http');

const server = http.createServer(app);

server.listen(3000, () => {
	console.log('server running on ', server.address());
});