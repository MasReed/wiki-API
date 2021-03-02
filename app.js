const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const port = 3000;


// Initialize app instance and utilize packages
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));


// MongoDB connection and schema
mongoose.connect('mongodb://localhost:27017/wikiDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const articleSchema = {
    title: String,
    content: String
}

const Article = new mongoose.model("Article", articleSchema);


// Root route
app.get('/', function(req, res){
    res.send("<h2>Hello</h2>")
});


// Server connection
app.listen(port, function(){
    console.log('Server started on port ' + port);
});
