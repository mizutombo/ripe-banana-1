const router = require('express').Router();
const Film = require('../models/film');

const bodyParser = require('body-parser').json();

router

	// `GET /films` | [{ title, studio.name }]
	.get('/', (req, res, next) => {
		const query = {};
		if(req.query.type) {
			query.type = req.query.type;
		}
		Film.find(query)
			.populate('title')
			.populate({
				path: 'studio',
				select: 'name'
			})
			.lean()
			.then(films => res.send(films))
			.catch(next);
	})

	// `GET /films/:id` | { title, studio.name, actors: [ name ] }
	.get('/:id', (req, res, next) => {	// added next and a .catch(next) for error handing
		Film.findById(req.params.id)
			.populate('title')
			.populate({
				path: 'studio',
				select: 'name'
			})
			.populate({
				path: 'actors',
				select: ['name']
			})
			.lean()
			.then(film => {
				if(!film) {
					res.status(404).send({error: `Id ${req.params.id} Not Found`});
				}
				else {
					res.send(film);
				}
			})
			.catch(next);
	})

	.post('/', bodyParser, (req, res, next) => {
		new Film(req.body).save()
			.then(film => res.send(film))
			.catch(next);
	})

	.put('/:id', bodyParser, (req, res, next) => {
		return Film.findByIdAndUpdate(
					req.params.id,
					req.body,
					{new: true, runValidators: true}
			)
			.then(film => {
				res.send(film);
			})
			.catch(next);
	})

	.delete('/:id', (req, res, next) => {
		Film.findByIdAndRemove(req.params.id)
			.then(deleted => {
				res.send({deleted: !!deleted});
			})
			.catch(next);
	});

module.exports = router;