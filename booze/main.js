import http from 'node:http';
const server = http.createServer();
server.on('request', (req, res) => {
  console.log(req);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('sauce');
});
server.once('listening', (ev)=>{
  console.log(new Date());
});
server.listen(38999, 'localhost');
