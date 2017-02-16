const chai = require('chai');
const chaiHttp = require('chai-http');
const childProcess = require('child_process');
const mongoose = require('mongoose');

const app = require('../../lib/app');

const assert = chai.assert;

chai.use(chaiHttp);
const request = chai.request(app);

//connect to mongo
process.env.MONGODB_URI = 'mongodb://localhost:27017/ripe-banana-test';
const connection = require('../../lib/connection');

const getData = collection => {
	return `mongoimport --db ripe-banana-test --collection ${collection} --file=./data/${collection}.json --jsonArray `;
};

describe('studio API', () => {
    let marvelStudioId = null; // used to test for GET/:id

    // drop database before a new test iteration
    before(() => connection.dropDatabase());

    before(done => {
        // studios.json gets put into mongo, an array of 4 studio objects
        childProcess.exec(getData('studios'), err => {
            if (err) return done(err);
            done();
        });
    });


    it('GETs the array of studios', () => {
        return request.get('/studios')
            .then(res => {
                const studioArr = res.body;
                marvelStudioId = res.body[1]._id; // used for GET/:id
                assert.equal(studioArr.length, 4);
            });
    });

    it('GETs one studio with a matching id', () => {
        return request.get(`/studios/${marvelStudioId}`)
            .then(res => {
                console.log('rezzbod is..', res.body);
            });
    });

});