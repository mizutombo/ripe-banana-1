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

describe('films REST HTTP API', () => {

	before(() => mongoose.connection.dropDatabase());

	const request = chai.request(app);

	const godzilla = {
		title: 'Godzilla',
		studio: 'Toho',
		released: '1954-11-3',
		actors: 'Akira Takarada',
		reviews: ''
	};

	let mothra = {
		title: 'Mothra',
		studio: 'Toho',
		released: '1961-6-30',
		actors: 'Frankie Sakai',
		reviews: ''
	};

	let invasion_of_astro_monster = {
		title: 'Invasion of Astro-Monster',
		studio: 'Toho',
		released: '1965-12-19',
		actors: 'Akira Takarada',
		reviews: ''
	};	

	it('/GET returns empty array of films', () => { // passes test
		return request.get('/films')
			.then(req => req.body)
			.then(films => assert.deepEqual(films, []));
	});

	function saveFilm(film) {
		return request.post('/films')
			.send(film)
			.then(res => res.body);
	}

	it('/POST saves a film', () => {
		return saveFilm(godzilla);
			// .then(savedFilm => {
			// 	assert.isOk(savedFilm._id);
			// 	godzilla._id = savedFilm._id;
			// 	godzilla.__v = 0;
			// 	assert.deepEqual(savedFilm, godzilla);
			// });
	});

	it('/GET retrieves saved film', done => {
		return request.get(`/films/${godzilla._id}`)
			.then(res => {
				assert.deepEqual(res.body, godzilla);
				done();
			});
	});

	it('/GET returns list of all films after POST', () => {
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

	it('/PUT updates films with new data', () => {
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

	it('/DELETE film from films list', () => {
		return request.del(`/films/${mothra._id}`)
			.then(res => {
				assert.isTrue(res.body.deleted);
			});
	});

});