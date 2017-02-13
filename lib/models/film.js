const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');

const schema = new Schema({
	
	title: {
		type: String,
		required: true
	},
	studio: {
		type: Schema.Types.ObjectId,
		ref: 'Studio'
	},
	released: {
		type: Date,
		required: true
	},
	actors: {
		type: Schema.Types.ObjectId,
		ref: 'Actor'
	}, 
	reviews: [Review.schema]
	
});

module.exports = mongoose.model('Film', schema);