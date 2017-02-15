const assert = require('chai').assert;
const Actor = require('../lib/models/actor');

describe('Actor model schema', () => {

	it('accepts appropriately formated schema data', () => {
    	return new Actor({
        	name: 'Charlie Chaplin',
        	dob: '1889-04-16'
    	}).validate()
        .catch(err => { console.log(err); throw err; });
	});

	it.skip('PASSING: rejects actor input w/out required field: name', () => {
    	return new Actor({
        	dob: '1889-04-16'
    	}).validate()
        .then(actor => console.log('actor=', actor))
        .catch(err => { console.log(err); throw err; });
	});

	it('accepts actor input w/out non-required field: dob', () => {
    	return new Actor({
        	name: 'Charlie Chaplin',
	    }).validate()
        .catch(err => { console.log(err); throw err; });
	});

	it('shows all actor fields', () => {
		return new Actor({
			name: 'Charlie Chaplin',
			dob: '1889-04-16'
		}).validate()
        .then(actor => console.log('actor=', actor))
        .catch(err => { console.log(err); throw err; });
	});

});