import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import _ from 'lodash';
import auth from './auth.js';
import mongoose from 'mongoose';
import { getDate } from './date.js';

const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const homeContent = 'This is starting content for home.';
const aboutContent = 'This is content for about.';
const contactContent = 'This is content for the contact page.'

const blogDB = mongoose.createConnection(`mongodb+srv://${auth.db_user}:${auth.db_pass}@learning.pp2n17d.mongodb.net/blogDB?retryWrites=true&w=majority`);

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    maxLength: 100
  },
  date: String,
  content: String,
});

const Post = blogDB.model('Post', postSchema);

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', (req, res) => {
  // send array of db documents, not posts
  Post.find({}, null, {sort: {_id: -1}}, (err, docs) => {
    if (!err) {
      res.render('home', {content: homeContent, posts: docs})
    } else {
      res.send('There was an error retrieving blog posts');
    }
  })
});


app.get('/about', (req, res) => {
  res.render('about', {content: aboutContent});
});


app.get('/contact', (req, res) => {
  res.render('contact', {content: contactContent});
});


app.get('/compose', (req, res) => {
  res.render('compose');
});


app.post('/compose', async (req, res) => {
  const newPost = new Post({
    title: req.body.postTitle,
    date: getDate(),
    content: req.body.postContent
  });

  await newPost.save();

  res.redirect('/');
});


app.get('/posts/:postId', (req, res) => {
  const postId = req.params.postId;

  Post.findOne({_id: postId}, (err, doc) => {
    if (!err) {
      res.render('post', {post: doc});
    } else {
      res.send(`No post with post id ${postId} found.`);
    }
  });
});


app.listen(port, err => {
  err ? console.warn(err) : console.log(`app.js is running on port ${port}`);
})