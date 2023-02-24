import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import _ from 'lodash';
import auth from './auth.js';
import mongoose from 'mongoose';

const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const homeContent = 'This is starting content for home.';
const aboutContent = 'This is content for about.';
const contactContent = 'This is content for the contact page.'

const blogDB = mongoose.createConnection(`mongodb+srv://admin-tjk:${auth.mongodb}@learning.pp2n17d.mongodb.net/blogDB?retryWrites=true&w=majority`);

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    maxLength: 100
  },
  date: String,
  content: String,
});


// const posts = [];

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.render('home', {content: homeContent, posts: posts} );
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


app.post('/compose', (req, res) => {
  const post = {
    title: req.body.postTitle,
    content: req.body.postContent,
    url: _.kebabCase(_.lowerCase(req.body.postTitle))
  }

  posts.push(post);

  res.redirect('/');
});


app.get('/posts/:postName', (req, res) => {
  posts.forEach( post => {
    const requestedTitle = _.lowerCase(req.params.postName);
    const postTitle = _.lowerCase(post.title);

    if (postTitle === requestedTitle) {
      res.render('post', {postTitle: post.title, postContent: post.content});
    }
  });
});


app.listen(port, err => {
  err ? console.warn(err) : console.log(`app.js is running on port ${port}`);
})