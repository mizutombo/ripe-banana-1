const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	name: {
		type: String,
		required: true
	},
	address: {
		city: { type: String, required: true },
		state: { type: String, required: true, uppercase: true },
		country: { type: String, required: true }
	}
});

module.exports = mongoose.model('Studio', schema);