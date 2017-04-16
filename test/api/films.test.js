const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

// start db ... store connection ... clear db
process.env.MONGODB_URI = 'mongodb://localhost:27017/films-test';
const connection = require('../../lib/connection');
const mongoose = require('mongoose');
const app = require('../../lib/app');

// const parseBody = require('body-parser').json();

describe('Test films REST HTTP API : ', () => {

	before(() => mongoose.connection.dropDatabase());

	const request = chai.request(app);

	const godzilla = {
		title: 'Godzilla',
		studio: '589a503f2fe3c376dc88b890',
		released: '1954-11-03T00:00:00.000Z',
		actors: ['589a503f2fe3c376dc88b795'],
		reviews: []
	};

	let mothra = {
		title: 'Mothra',
		studio: 'Toho',
		released: '1961-06-30',
		actors: ['Frankie Sakai'],
		reviews: []
	};

	let invasion_of_astro_monster = {
		title: 'Invasion of Astro-Monster',
		studio: 'Toho',
		released: '1965-12-19',
		actors: ['Akira Takarada'],
		reviews: []
	};	

	it('test for /GET returns empty array of films', () => { // passes test
		return request.get('/films')
			.then(req => req.body)
			.then(films => assert.deepEqual(films, []));
	});

	function saveFilm(film) {
		return request.post('/films')
			.send(film)
			.then(res => { return res.body; });
	}

	it('test for /POST saves a film', () => {
		return saveFilm(godzilla)
			.then(savedFilm => {
				assert.equal(savedFilm.title, godzilla.title);
				assert.equal(savedFilm.studio, godzilla.studio);
				assert.equal(savedFilm.released, godzilla.released);
				assert.equal(savedFilm.actors, godzilla.actors);
				assert.equal(savedFilm.reviews, godzilla.reviews);
				assert.isOk(savedFilm._id);
				godzilla._id = savedFilm._id;
			});
	});

	it('test for /GET retrieves saved film', () => {
		return request.get(`/films/${godzilla._id}`)
			.then(res => {
				console.log('in get', res.body);
				assert.deepEqual(res.body, godzilla);
			});
	});

	it('test for /GET returns list of all films after POST', () => {
		return Promise.all([
			saveFilm(mothra),
			saveFilm(invasion_of_astro_monster)
		])
		.then(savedFilms => {
			mothra = savedFilms[0];
			invasion_of_astro_monster = savedFilms[1];
		})
		.then(() => request.get('/films'))
		.then(res => {
			const films = res.body;
			assert.deepEqual(films, [godzilla, mothra, invasion_of_astro_monster]);
		});
	});

	it('test for /PUT updates films with new data', () => {
		invasion_of_astro_monster.title = 'Monster Zero';
		const url = `/films/${invasion_of_astro_monster._id}`;

		return request.put(url)
			.send(invasion_of_astro_monster)
			.then(res => {
				assert.deepEqual(res.body, invasion_of_astro_monster);
				return request.get(url);
			})
			.then(res => {
				assert.deepEqual(res.body, invasion_of_astro_monster);
			});
	});

	it('test for /DELETE film from films list', () => {
		return request.del(`/films/${mothra._id}`)
			.then(res => {
				assert.isTrue(res.body.deleted);
			});
	});

	it('test for GET/:id returns 404 error on non-existing id', () => {
		return request.get('/films/589a503f2fe3c376dc88b895')
			.then(
				() => { throw new Error('200 successful status code not expected'); },
				res => {
					assert.equal(res.status, 404);
					assert.ok(res.response.body.error);
				}
			);
	});

});