const http = require('http');
const host = 'localhost';
const port = '3000';

const server = http.createServer((req,res) => {
   console.log(req.headers) ;
   res.statusCode = '401';
   res.setHeader('content-Type','text/html' );
   res.end('<html><head></head><body><h1>This is my First server</h1></body></html>');
});

server.listen(port, host, () => {
    console.log(`server running @ http://${host}:${port}`);
});

