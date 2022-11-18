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
  const post = fs.readFileSync(`./posts/${title}`);

  if(fs.existsSync(`./posts/${title}`)) {
    // send response
    res.end(post)
  }
})

//get all blogs
app.get('/blogs', (req, res) => {
  // how to get the file names of all files in a folder??
  const posts = fs.readdirSync('./posts');
  const postsTitles = posts.map((post) => {
    return {
      title: post,
    };
  });
  res.send(postsTitles);
});

//create a post
app.post('/blogs', (req, res) => {
    // How to get the title and content from the request??
    const {title , content} = req.body;
    fs.writeFileSync(`./posts/${title}`, content);
    res.end('ok')
})

//update a post
app.put('/posts/:title', (req, res) => {
  // How to get the title and content from the request?
  const title = req.params.title
  const content = req.body.content
  
  // What if the request does not have a title and/or content?
  if (fs.existsSync(`./posts/${title}`)) {
    fs.writeFileSync(`./posts/${title}`, content);
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

  if (fs.existsSync(`./posts/${title}`)) { // Add condition here
    fs.unlinkSync(`./posts/${title}`);
    res.end('ok');
  } else {
    res.end('This post does not exist!');
  }
})

app.listen(3000, () => {

  //create folder posts if not exist
  const postsFolder = './posts';
  if (!fs.existsSync(postsFolder)) {
    fs.mkdirSync(postsFolder);
  } else {
    console.log(`${postsFolder} is already exists`);
  }
  console.log('server is running');
});