/**
 * Exercise 3: Create an HTTP web server
 */

const http = require('http');
const fs = require('fs')

//create a server
let server = http.createServer(function (req, res) {

	//Hello world task
	// res.write('Hello World!'); // Sends a response back to the client
	// res.end(); // Ends the response

	// YOUR CODE GOES IN HERE
	//include index.html
	if(req.url === '/') {
    fs.readFile('index.html' , (err , content) => {
      if(err) throw err
      res.writeHead(200 , {'Content-Type' : 'text/html'})
      res.end(content , 'utf8')
    })
    return
  }

	//include index.js
	if(req.url === '/index.js') {
    fs.readFile('index.js' , (err , content) => {
      if(err) throw err
      res.writeHead(200 , {'Content-Type' : 'application/javascript'})
      res.end(content , 'utf8')
    })
    return
  }

	//include style.css
	if(req.url === '/style.css') {
    fs.readFile('style.css' , (err , content) => {
      if(err) throw err
      res.writeHead(200 , {'Content-Type' : 'text/css'})
      res.end(content , 'utf8')
      return
    })
    return
  }

});

server.listen(3000); // The server starts to listen on port 3000
