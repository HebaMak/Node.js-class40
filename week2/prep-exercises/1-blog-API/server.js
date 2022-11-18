const express = require('express')
const fs = require("fs");

const app = express();
app.use(express.json())

// YOUR CODE GOES IN HERE
//read blogs
app.get('/', function (req, res) {
  res.send('Hello World')
})

//get one blog
app.get('/blogs/:title', (req, res) => {

  // How to get the title from the url parameters?
  const title = req.params.title

  // check if post exists
  const post = fs.readFileSync(title);

  if(fs.existsSync(title)) {
    // send response
    res.end(post)
  }
})

//create a post
app.post('/blogs', (req, res) => {
    // How to get the title and content from the request??
    const {title , content} = req.body;
    fs.writeFileSync(title, content);
    res.end('ok')
})

//update a post
app.put('/posts/:title', (req, res) => {
  // How to get the title and content from the request?
  const title = req.params.title
  const content = req.body.content
  
  // What if the request does not have a title and/or content?
  if (fs.existsSync(title)) {
    fs.writeFileSync(title, content);
    res.end('ok')
  }
  else {
    res.end('This post does not exist!');
  }
})

//delete a post
app.delete('/blogs/:title', (req, res) => {
  // How to get the title from the url parameters?
  const title = req.params.title

  if (fs.existsSync(title)) { // Add condition here
    fs.unlinkSync(title);
    res.end('ok');
  } else {
    res.end('This post does not exist!');
  }
})



app.listen(3000 , ()=> console.log('server is running at 3000'))