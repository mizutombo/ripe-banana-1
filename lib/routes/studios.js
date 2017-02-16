const parseBody = require('body-parser');
const router = require('express').Router();
const Studio = require('../models/studio');

// This will GET/studios
// `router.get('/studios', ...)` makes the path `GET/studios/studios` (mounted from app.js) 
router.get('/', (req, res, next) => {
    Studio.find()
        .then(studios => res.send(studios))
        .catch(next);
});

router.get('/:id', (req, res) => {
    // return name, address, films[]
    Studio.findById(req.params.id)
        .then(studio => {
            if (!studio) res.status(404).send({ error: `id ${req.params.id} not found` });
            else res.send(studio);
        });
});

router.post('/', (req, res, next) => {
    parseBody(req)
        .then(body => new Studio(body).save())
        .then(studio => {
            console.log('new studio is..', studio);
            res.send(studio);
        })
        .catch(next);
});

// studios cannot be deleted if there are films
// route.delete('/', (req, res) => {
//     parseBody(req)
//         .then
// });

module.exports = router;