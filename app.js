import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const homeStartingContent = 'This is starting content for home';
const aboutContent = 'This is content for about';
const contactContent = 'This is content for the contact page'

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.render('home');
});


app.listen(port, (err) => {
  err ? console.warn(err) : console.log(`app.js is running on port ${port}`);
})