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


// 'Root' Methods
app.route('/')

    .get(function(req, res){
        res.send("<h2>Hello</h2>")
    });


// 'Articles' Methods
app.route('/articles')

    .get(function(req, res){

        Article.find({}, function(err, foundArticles){
            if (!err){
                res.send(foundArticles);
            } else {
                res.send(err);
            }
        });
    })


    .post(function(req, res){

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
    })


    .delete(function(req, res){

        Article.deleteMany(function(err){
            if (!err) {
                res.send("Deleted all documents.");
            } else {
                res.send(err);
            }
        });
    });


// Specific Article Methods
app.route('/articles/:articleTitle')

    .get(function(req, res){

        Article.findOne(
            {title: req.params.articleTitle},
            function(err, foundArticle){
                if (!err){
                    if (foundArticle) {
                        res.send(foundArticle);
                    } else {
                        res.send("No article matching that title was found.");
                    }
                } else {
                    res.send(err);
                }
            }
        );
    })


    .put(function(req, res){

        Article.update(
            {title: req.params.articleTitle},
            {title: req.body.title, content: req.body.content},
            {overwrite: true},
            function(err){
                if (!err){
                    res.send("Successfully updated article.")
                } else {
                    res.send(err);
                }
            }
        );
    })


    .patch(function(req, res){

        Article.update(
            {title: req.params.articleTitle},
            {$set: req.body},
            function(err){
                if (!err){
                    res.send("Successfully patched article.");
                } else {
                    res.send(err);
                }
            }
        );
    })


    .delete(function(req, res){

        Article.deleteOne(
            {title: req.params.articleTitle},
            function(err){
                if (!err) {
                    res.send("Deleted all documents.");
                } else {
                    res.send(err);
                }
            }
        );
    });


// Server connection
app.listen(port, function(){
    console.log('Server started on port ' + port);
});
