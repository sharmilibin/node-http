const http = require('http');
const fs = require('fs');
const path = require('path');

const host = 'localhost';
const port = '3000';

const server = http.createServer((req, res) => {
    console.log('Request for ' + req.url + ' Method for ' + req.method);
    if (req.method === 'GET') {
        var fileurl;
        if (req.url === '/') {
            fileurl = '/index.html';

        }
        else {
            fileurl=req.url;
        }
        var filePath = path.resolve('./public' +fileurl);
        
        const fileExt = path.extname(filePath);
        if(fileExt === '.html') {
            fs.exists(filePath, (exists) => {
                if(!exists) {
                    res.statusCode=404;
                    res.setHeader('content-Type', 'text/html');
                    res.end('<html><head></head><body><h1>Page Not Found ' +fileurl+' </h1></body></html>');
                    return;
                }
                res.statusCode=200;
                res.setHeader('content-Type', 'text/html');
                fs.createReadStream(filePath).pipe(res);
            });
        } else {
            res.statusCode=404;
            res.setHeader('content-Type', 'text/html');
            res.end('<html><head></head><body><h1>Not Html file </h1></body></html>');

        }

    }
    else {
        res.statusCode=404;
        res.setHeader('content-Type', 'text/html');
        res.end('<html><head></head><body><h1>Method is not get ' +req.method+ '</h1></body></html>');
    }
});

server.listen(port, host, () => {
    console.log(`server running @ http://${host}:${port}`);
});

