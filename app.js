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


// Articles Route GET
app.get('/articles', function(req, res){
    Article.find({}, function(err, foundArticles){
        if (!err){
            res.send(foundArticles);
        } else {
            res.send(err);
        }
    });
});


// Articles Route POST
app.post('/articles', function(req, res){

    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    });
    newArticle.save(function(err){
        if (!err) {
            res.send("Successfully added a new article.");
        } else {
            res.send(err);
        }
    });

});


// Articles Route DELETE
app.delete('/articles', function(req, res){
    Article.deleteMany({}, function(err){
        if (!err) {
            res.send("Deleted all documents.");
        } else {
            res.send(err);
        }
    });
});


// Server connection
app.listen(port, function(){
    console.log('Server started on port ' + port);
});
