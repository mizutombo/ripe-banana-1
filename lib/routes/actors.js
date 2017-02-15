const router = require('express').Router();

const Actor = require('../models/actor');
// const parseBody = require('parse-body');

// function parseBody(req) {
// 	return new Promise((resolve, reject) => {
// 		let body = '';
// 		req.on('data', data => body += data);
// 		req.on('error', err => reject(err));
// 		req.on('end', () => {
// 			const actor = JSON.parse(body);
// 			resolve(actor);
// 		});
// 	});
// }


router
    .get('/', (req, res, next) => {
        // res.send('hello world')
        Actor.find()
            .then(actors => res.send(actors))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        Actor.findById(req.params.id)
            .then(actor => res.send(actor))
            .catch(next);
    })

// STILL WORKING ON THIS:

    // .post('/', (req, res, next) => {
    //     // let model = actor;
    //     parseBody(req)
    //         .then(body => {
    //             // body.name = req.name;
    //             // body.dob = req.dob;
    //             return new Actor(body).save();
    //         })
    //         .then(actor => res.send(actor))
    //         .catch(next);
    // })


    // FROM CLASS LAB FOR REFERENCE
    // .post('/', (req, res, next) => {
    //     req.favoriteToys = ['snuggy'];
    //     next();
    // }, (req, res, next) => {
    //     parseBody(req)
    //         .then(body => {
    //             body.favoriteToys = req.favoriteToys;
    //             return new Pet(body).save();
    //         })
    //         .then(pet => res.send(pet))
    //         .catch(next);
    // })

    // .delete('/:id', (req, res) => {
    //     Actor.findByIdAndRemove(req.params.id)
    //         if(actor ) // is not found in film. json file
    //         .then(deleted => {
    //             res.send({deleted: !!deleted });
    //         });
    //         .catch( () => {
    //             res.send('Cannot delete. That actor appears in another film.');
    //         })
    // });


    // .delete('/:id', (req, res) => {
    //     ACTOR.findByIdAndRemove(req.params.id)
    //         .then(deleted => {
    //             res.send({ deleted: !!deleted });
    //         });
    // });


module.exports = router;


