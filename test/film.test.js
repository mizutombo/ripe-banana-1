const Film = require('../lib/models/film');
const assert = require('chai').assert;
const film = new Film();

describe('Film data schema :', () => {

	it('checks for required "title" data', done => {
		film.title = 'Godzilla';
		film.validate(err => {
			assert.isOk(err, 'film title is required');
			done();
		});
	});

	it('checks that "title" is a String', done => {
		film.title = 5;
		film.validate(err => {
			assert.isOk(err, 'film title must be a string');
			done();
		});
	});

	it('checks for required "released" date data', done => {
		film.released = '';
		film.validate(err => {
			assert.isOk(err, 'film release date is required');
			done();	
		});
	});

	it('checks that "released" is in correct Date format', done => {
		film.released = '2015-8-17';
		film.validate(err => {
			assert.notTypeOf(err, 'date', 'film release date must be in correct Date format');
			done();
		});
	});	

});