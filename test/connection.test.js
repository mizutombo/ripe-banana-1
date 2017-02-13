const connection = require('../lib/connection');
const assert = require('chai').assert;

describe('connect to db', () => {

	const DB_URI = 'mongdb://localhost:27017/local';
	let db = null;

before(() => {
	return connection.connect(DB_URI)
		.then(_db => db = _db);
});

it('resolved db from .connect() same as connection.db', () => {
	assert.strictEqual(db, connection.db);
});

});
