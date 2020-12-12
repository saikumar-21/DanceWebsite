const express = require('express');
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser')
mongoose.connect('mongodb://localhost/contact', {useNewUrlParser: true});
const port = 3000;


const contactSchema = new mongoose.Schema({
  name: String,
  phone:String,
  email: String
});

const contact = mongoose.model('Contact',contactSchema);

app.use('/static', express.static('static'));
app.use(express.urlencoded());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', function (req, res) {
    res.status(200).render('home.pug');
  });

  app.get('/contact', (req, res)=> {
    res.status(200).render('contact.pug');
  });

  app.post('/contact', (req, res)=> {
    var data = new contact(req.body);
    data.save().then(()=>{
      res.send('Item has been saved!');
    }).catch(()=>{
      res.status(400).send('Item was not saved.');
    });
    // res.status(200).render('contact.pug');
  });

  app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
  });