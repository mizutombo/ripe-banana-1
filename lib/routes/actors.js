const router = require('express').Router();
const Actor = require('../models/actor');

router
    .get('/', (req, res, next) => {
        // res.send('hello world')
	Actor.find()
            .then(actors => res.send(actors))
            .catch(next);
})

    .get('/actor/:id', (req, res, next) => {
	Actor.findById(req.params.id)
            .then(actor => res.send(actor))
            .catch(next);
});

module.exports = router;
