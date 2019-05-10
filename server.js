const express = require('express');
const server = express();

const router = require(`./router.js`)

server.use(express.json());
server.use('/api/posts', router)

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h>
    <p>Welcome to the Lambda Hubs API</p>
  `);
});

module.exports = server; // Very Important or it wont run!!