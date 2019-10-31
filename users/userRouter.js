const express = require('express');

const { get, getById, insert, update, remove, getUserPosts } = require('./userDb')

const postFunctions = require('../posts/postDb')

const router = express.Router();

router.post('/', validateUser, (req, res) => {
    const user = req.body;
    insert(user)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            console.log(err)
        })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
    const post = {
        text: req.body.text,
        user_id: req.user.id
    }
    postFunctions.insert(post)
        .then(post => {
            res.status(200).json(post)
        })
});

router.get('/', (req, res) => {
    get()
        .then(user => {
            res.status(200).json(user)
        })
});

router.get('/:id', validateUserId, (req, res) => {
    console.log(req.user)
    getById(req.user.id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(() => {
            res.status(500).json({ error: "Request failed" })
        })
});

router.get('/:id/posts', validateUserId, (req, res) => {
    getUserPosts(req.params.id)
        .then(userPosts => {
            res.status(200).json(userPosts)
        })
});

router.delete('/:id', validateUserId, (req, res) => {
    remove(req.params.id)
        .then(deleted => {
            res.status(200).json(`user deleted ${deleted}`)
        })
});

router.put('/:id', validateUserId, (req, res) => {
    const data = req.body;
    update(req.params.id, data)
        .then(updated => {
            res.status(200).json(`updated`)
        })
});

//custom middleware

function validateUserId(req, res, next) {
    const { id } = req.params;
    getById(id)
        .then(user => {
            if (user) {
                req.user = user
                next()
            } else {
                res.status(400).json({ message: "invalid user id" })
            }
        })
};

function validateUser(req, res, next) {
    const body = req.body;
    if (!body) {
        res.status(400).json({ message: "missing user data" })
    } else if (!body.name) {
        res.status(400).json({ message: "missing name" })
    }
    next()
};

function validatePost(req, res, next) {
    const body = req.body;
    if (!body) {
        res.status(400).json({ message: "missing user data" })
    } else if (!body.text) {
        res.status(400).json({ message: "missing text" })
    }
    next()
};

module.exports = router;
