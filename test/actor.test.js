const assert = require('chai').assert;
const Actor = require('../lib/models/actor');

describe('Actor model', () => {
	it('shows all actor fields', () => {
		return new Actor({
			name: 'Charlie Chaplin',
			dob: '1889-04-16'
		}).validate()
        .then(actor => console.log('actor=', actor))
        .catch(err => { console.log(err); throw err; });
	});
});