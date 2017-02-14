const router = require('express').Router();
const Studio = require('../models/studio');
const parseBody = require('../body-parser');

// This will GET/studios
// `router.get('/studios', ...)` makes the path `GET/studios/studios` (mounted from app.js) 
router.get('/', (req, res, next) => {
    // res.send('i am here');
    Studio.find()
        .then(studios => res.send(studios))
        .catch(next);
});

// router.get('/studios/:id', (req, res) => {
//     // name, address, films[]
//     Studio.findById(req.params.id)
//         .then(studio => {
//             if (!studio) res.status(404).send({ error: `id ${req.params.id} not found` });
//             else res.send(studio);
//         });
// });

router.post('/', (req, res, next) => {
    parseBody(req)
        .then(body => new Studio(body).save())
        .then(studio => res.send(studio))
        .catch(next);
});

module.exports = router;