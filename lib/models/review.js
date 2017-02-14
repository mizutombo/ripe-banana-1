const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	review: String
});

module.exports = mongoose.model('Review', schema);