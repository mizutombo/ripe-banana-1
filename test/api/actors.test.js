const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const connection = require('../../lib/connection');
const app = require('../../lib/app');

const request = chai.request(app);


describe('actors routes test', () => {


    it('GET /actors returns an array of 11 actors', () => {
        return request
            .get('/actors')
            .then (req => req.body)
            .then(actors => assert.Equal(actors.length, 11))
    });

    it('GET /actors/:id returns a specific actor', () => {
        return request
            .get('/actors/58a368d61b83b3f1522a9fe3')
            .then(req => req.body)
            .then(actor => assert.deepEqual(actor,
                 {
                    "_id" : ObjectId("58a368d61b83b3f1522a9fe3"),
                    "name" : "Robert Downey, Jr.",
                    "dob" : "2000-01-01"
                }
             ))
    });

})