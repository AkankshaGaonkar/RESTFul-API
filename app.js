const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

//to set up mongodb we are using mongoose(setup a connection to mongodb)
mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true});

const articleSchema = {
    title: String,
    content: String
};
const Article = mongoose.model("Article", articleSchema);

const Fruit = mongoose.model("Fruit",articleSchema);
////////////////////////////////Request targeting All Articles///////////////////////////////
app.route("/articles")

//GET Request
.get(function(req,res){
    Article.find(function(err, foundArticles){
        if(!err){
            res.send(foundArticles);
        }else{
        res.send(err);
        }
    });
})

.get(function(req,res){
    Fruit.find(function(err, getfruit){
        if(!err)
        {
            res.send(getfruit);
        }else{
            res.send(err);
        }
    });
})

//Here the post req targets the article routes and creates a new article using the data that was submitted through the post request and then we save the new article and check wt for loop for errors if any
.post(function(req,res){
    console.log();
    console.log();

    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    });
    newArticle.save(function(err){
        if(!err){
            res.send("Successfully added a new article.");
        }else
        {
            res.send(err);
        }
    });
})

//DELETE METHOD
.delete(function(req,res)
{ Article.deleteMany(function(err){
    if(!err)
    {
        res.send("Successfully deleted all articles.")
    }else{
        res.send(err);
    }
    });
});

////////////////////////////////Request targeting Specific Article///////////////////////////////

app.route("/articles/")
app.listen(3000, function(){
    console.log("Server started on port 3000");
});

