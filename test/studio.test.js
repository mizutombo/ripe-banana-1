const assert = require('chai').assert;
const Studio = require('../lib/models/studio');
// const mongoose = require('mongoose');
// mongoose.Promise = Promise;

describe.only('Studio model', () => {

    function testHasValidationError(data) {
        return new Studio(data)
        .validate()
        .then(
            () => {throw new Error('validation should not succeed');},
            () => {console.log('error is..', Error);}
        );
    }

    it('shows studio name', () => {
        return testHasValidationError({name: 1});

        // return new Studio({
        //     name: 'Warner Bros.',
        //     address: {
        //         city: 'Burbank',
        //         state: 'California',
        //         country: 'USA'
        //     }
        // }).validate()
        // .then(studio => console.log('stdo=', studio))
        // .catch(err => { console.log(err); throw err; });
    });
});

