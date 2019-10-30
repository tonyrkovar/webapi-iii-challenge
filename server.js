const express = require('express');
const logger = require('./middleware/logger-middleware');
const server = express();


server.get('/', logger('test'), (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware


module.exports = server;
