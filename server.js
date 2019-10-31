const express = require('express');
const logger = require('./middleware/logger-middleware');
const server = express();
const postRouter = require('./posts/postRouter')
const userRouter = require('./users/userRouter')

server.get('/', logger('test'), (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware
server.use(express.json())
// server.use(validatePostId)
server.use('/api/post', logger('Logger for Posts'), postRouter)
server.use('/api/user', logger('Logger for Users'), userRouter)


module.exports = server;
