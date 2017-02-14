const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

// start db ... store connection ... clear db
const connection = require('../lib/connection');
const app = require('../lib/app');

describe('films', () => {

	before(done => {
		const drop = () => connection.db.dropDatabase(done);
		if (connection.readyState === 1) drop();
		else connection.on('open', drop);
	});

	before(done => {
		const CONNECTED
	});

});
