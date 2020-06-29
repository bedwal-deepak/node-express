const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dishRouter = require('./routes/dishRouter');


const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/dishes', dishRouter); //mounting router i.e.any request coming to dishes handled by dishRouter

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
res.statuscode = 200;
res.setHeader('Content-Type', 'text/html');
res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});