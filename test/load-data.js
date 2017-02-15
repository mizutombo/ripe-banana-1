process.env.DB_URI = 'mongodb://localhost:27017/ripe-banana-test';
require('../lib/connection');
const childProcess = require('child_process');
const mongoose = require('mongoose');



function loadData(collection) {
	return `mongoimport --db ripe-banana-test --collection ${collection} --file data/${collection}.json --jsonArray `;
}

before(done => {
	mongoose.connection.dropDatabase();
	childProcess.exec(loadData('films'), err => {
		if(err) return done(err);
		childProcess.exec(loadData('studios'), err => {
			if(err) return done(err);
			childProcess.exec(loadData('actors'), done);
		});
	});
});