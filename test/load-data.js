process.env.DB_URI = 'mongodb://localhost:27017/ripe-banana-test';
require('../lib/connection');
const mongoose = require('mongoose');


function loadData(collection) {
    return `mongoimport --db ripe-banana --collection ${collection} --file data/${collections}.json --jsonArray `;
}

before( () => {
    mongoose.connection.dropDatabase();
    loadData(films);
    loadData(studios);
    loadData(actors);
});

