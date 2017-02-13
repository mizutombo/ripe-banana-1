const router = require('express').Router();
const Film = require('../models/film');

function parseBody(req) {
	return new Promise((resolve, reject) => {
		let body = '';
		req.on('data', data => body += data);
		req.on('error', err => reject(err));
		req.on('end', () => {
			const film = JSON.parse(body);
			resolve(film);
		});
	});
}

router
	.get('/', (req, res, next) => {
		const query = {};
		if(req.query.type) {
			query.type = req.query.type;

			Film.find(query)
				.populate({
					path: 'type',
					select: 'name'
				})
				.lean()
				.then(films => res.send(films))
				.catch(next);
		}

		get('/:id', (req, res) => {
			Film.findById(req.params.id)
				.lean()
				.then(film => {
					if(!film) {
						res.status(404).send({error})
					}
				})

		})

	});


	GET /films	[{ title, studio.name }]
GET /films/:id	{ title, studio.name, actors: [ name ] }