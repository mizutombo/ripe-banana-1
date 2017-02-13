const router = require('express').Router();
const Actor = require('../lib/models/actor');


router
    .get('/actors', (req, res, next) => {
        Actor.find()
            .then(actors => res.send(actors))
            .catch(next);
    })

    .get('/actor/:id', (req, res, next) => {
        Actor.findById(req.params.id)
            .then(actor => res.send(actor))
            .catch(next);
    })









module.exports = router;
