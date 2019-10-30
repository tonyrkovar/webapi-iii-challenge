const express = require('express');

const Routes = require('./postDb');


const router = express.Router();

router.get('/', (req, res) => {
    Routes.get()
        .then(posts => {
            res.status(200).json(posts)
        })
});

router.get('/:id', (req, res) => {
    const { id } = req.params
    Routes.getById(id)
        .then(post => {
            res.status(200).json(post)
        })
        .catch(err => {
            res.status(400).json({ error: `${err}` })
        })
});

router.delete('/:id', (req, res) => {
    const { id } = req.params
    Routes.remove(id)
        .then(deleted => {
            res.status(200).json(deleted.length)
        })
        .catch(err => {
            res.status(400).json({ errorMessage: 'borkend' })
        })
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const data = req.body;
    Routes.update(id, data)
        .then(updateCount => {
            res.status(200).json("updated")
        })
});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;