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
		}
			Film.find(query)
				// .populate({
				// 	path: 'type',
				// 	select: 'name'
				// })
				// .lean()
				.then(films => res.send(films))
				.catch(next);
	})

	.get('/:id', (req, res) => {
		Film.findById(req.params.id)
			.lean()
			.then(film => {
				if(!film) {
					res.status(404).send({error: `Id ${req.params.id} Not Found`});
				}
				else {
					res.send(film);
				}
			});
	})

	.post('/', (req, res, next) => {
		parseBody(req)
			.then(body => new Film(body).save())
			.then(film => res.send(film))
			.catch(next);
	})

	.put('/:id', (req, res) => {
		parseBody(req)
			.then(film => {
				return Film.findByIdAndUpdate(
					req.params.id,
					film,
					{new: true, runValidators: true}
				);
			})
			.then(film => {
				res.send(film);
			});
	})

	.delete('/:id', (req, res) => {
		Film.findByIdAndRemove(req.params.id)
			.then(deleted => {
				res.send({deleted: !!deleted});
			});
	});

module.exports = router;