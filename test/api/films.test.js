const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

// start db ... store connection ... clear db
const connection = require('../../lib/connection');
const app = require('../../lib/app');
const parseBody = require('body-parser');

describe('films', () => {

	// before(done => {
	// 	const drop = () => connection.db.dropDatabase(done);
	// 	if (connection.readyState === 1) drop();
	// 	else connection.on('open', drop);
	// });

	// before(done => {
	// 	const CONNECTED = 1;
	// 	if (connection.readyState === CONNECTED) dropCollection();
	// 	else connection.on('open', dropCollection);

	// 	function dropCollection()	{
	// 		const name = 'films';
	// 		connection.db
	// 			.listCollections({name})
	// 			.next((err, collinfo) => {
	// 				if (!collinfo) return done();
	// 				connection.db.dropCollection(name, done);
	// 			});
	// 	}
	// });

	const request = chai.request(app);

	const testFilm = {
		title: 'Godzilla',
		studio: 'Toho',
		released: '1954-11-3',
		actors: 'Akira Takarada',
		reviews: ''
	};

	it('/GET all films', done => {
		request
			.get('/Films')
			.then(res => {
				assert.deepEqual(res.body, []);
				done();
			})
			.catch(done);
	});

	it('/POST film', done => {
		request
			.post('/Films')
			.send(testFilm)
			.then(res => {
				const film = res.body;
				assert.ok(film._id);
				testFilm.__v = 0;
				testFilm._id = film._id;
				done();
			})
			.catch(done);
	}); 

	it('/GET all films after post', done => {
		request
			.get('/Films')
			.then(res => {
				assert.deepEqual(res.body, [testFilm]);
				done();
			})
			.catch(done);
	});

	it('/DELETE testFilm', done => {
		request
			.del(`/Films/${testFilm._id}`)
			.then(res => {
				testFilm.__v = 0;
				assert.deepEqual(res.body, testFilm);
				done();
			})
			.catch(done);
	});

	after(done => {connection.close(done);
	});


});
