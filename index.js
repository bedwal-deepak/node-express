const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');


const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

app.all('/dishes', (req,res,next) => {  //endpoint for all incoming requests
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next(); //means continue after this also
});

app.get('/dishes', (req,res,next) => {  //here res will be modified by previous function
    res.end('Will send all the diishes to you!');
});

/*And so here when we use the body parser, what happens is that for the incoming request, 
the body of the incoming request will be parsed and then added into the req object as req.body. 
So the req.body will give you access to whatever is inside that body of the message. 
So, when I send the request, I will add information to the request body in the form of 
a JSON string which contains a name and a description. So I'm going to extract these two piece 
of information and then print them out and then send them back to the client in the reply message. 
So I can say, req.body.and then name. And so the expectation is that when the client sends the post message, 
the post message body will contain a JSON string, which will also contains the name property in the 
JSON string. So req.body.name plus and this is where I will include with details:
+ req.body.description
*/
app.post('/dishes', (req,res,next) => {
    res.end('Will add the dish: ' + req.body.name + 
    'with details: ' + req.body.description);
});

app.put('/dishes', (req,res,next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
});

app.delete('/dishes', (req,res,next) => {  //tthis is a dangerous operation so keep in mind which user can perform this
    res.end('Deleting all the diishes');
});

app.get('/dishes/:dishId', (req,res,next) => {
    res.end('Will send details of the dish: ' + req.params.dishId +' to you!');
});

app.post('/dishes/:dishId', (req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /dishes/'+ req.params.dishId);
});

app.put('/dishes/:dishId', (req, res, next) => {
  res.write('Updating the dish: ' + req.params.dishId + '\n');
  res.end('Will update the dish: ' + req.body.name + 
        ' with details: ' + req.body.description);
});

app.delete('/dishes/:dishId', (req, res, next) => {
    res.end('Deleting dish: ' + req.params.dishId);
});

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