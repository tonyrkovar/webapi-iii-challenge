const express = require('express');

const Routes = require('./postDb');


const router = express.Router();

router.get('/', (req, res) => {
    Routes.get()
        .then(posts => {
            res.status(200).json(posts)
        })
});

router.get('/:id', validatePostId, (req, res) => {
    Routes.getById(req.params.id)
        .then(post => {
            res.status(200).json(post)
        })
});

router.delete('/:id', validatePostId, (req, res) => {
    const { id } = req.params
    Routes.remove(id)
        .then(deleted => {
            res.status(200).json(deleted.length)
        })
        .catch(err => {
            res.status(400).json({ errorMessage: 'borkend' })
        })
});

router.put('/:id', validatePostId, (req, res) => {
    const { id } = req.params;
    const data = req.body;
    Routes.update(id, data)
        .then(updateCount => {
            res.status(200).json(`updated ${updateCount.length}`)
        })
});

// custom middleware

function validatePostId(req, res, next) {
    const id = req.params.id;
    if (id) {
        next()
    } else {
        res.status(400).json({ error: "Invalid ID" })
    }
};


module.exports = router;