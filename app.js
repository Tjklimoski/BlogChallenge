import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const homeContent = 'This is starting content for home.';
const aboutContent = 'This is content for about.';
const contactContent = 'This is content for the contact page.'

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.render('home', {content: homeContent} );
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
  console.log(req.body.postTitle);
});


app.listen(port, err => {
  err ? console.warn(err) : console.log(`app.js is running on port ${port}`);
})