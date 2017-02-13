const router = require('express').Router();
const Studio = require('../models/studio-schemas');

router.get('/studios', (req, res, next) => {
    Studio.find()
        .then(studio => res.send(studio.name))
        .catch(next);
});

router.get('/studios/:id', (req, res) => {
    // name, address, films[]
    Studio.findById(req.params.id)
        .then(studio => {
            if (!studio) res.status(404).send({ error: `id ${req.params.id} not found` });
            else res.send([studio.name, studio.address]);
        });
});

module.exports = router;