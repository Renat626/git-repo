const http = require('http');

const server = http.createServer();

let basket = require('./script');

server.on('request', (req, res) => {
  res.end(`${basket}`);
});

server.listen(3000, 'localhost', () => {
  console.log("awdddadaw");
});

console.log(basket);
