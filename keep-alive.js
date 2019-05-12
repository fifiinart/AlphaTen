const express = require('express');
const server = express();
server.all('/', (req, res) => {
  res.send('My bot is alive!')
})

function keepAlive() {
  server.listen(8080, () => {
    console.log("Server is Ready!")
  });
}
module.exports = keepAlive;