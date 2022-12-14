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

app.route("/articles/:articleTitle")

//GET REQUEST 
.get(function(req,res){
    Article.findOne({title: req.params.articleTitle}, function(err, foundArticle){
    if(foundArticle){
            res.send(foundArticle);
        }else{
            res.send("No article matching that title was found");
        }
    });
})

//POST REQUEST
// .put(function(req,res){
//     Article.findOneAndUpdate(
//         {title: req.params.articleTitle},
//         {title:req.body.title, content: req.body.content},
//         {overwrite: true},
//         function(err){
//             if(!err){
//                 res.send("Successfully updated the article.");
//             }else{
//                 res.send("No article matching that title was found");
//             }
//         });
// });

// .put(function(req, res){
//     Article.findOneAndUpdate(
//     {title: req.params.articleTitle},
//     {$set:{title: req.body.title, content: req.body.content}},
//     {new: true},
//     function(err, article){
//     if(err){
//     res.send(err);
//     } else {
//     res.send(article);
//     }
//     }
// );
.put(function(req, res){
    Article.findOneAndUpdate(
    {title: req.params.articleTitle},
    {title: req.body.title, content: req.body.content},
    {new: true},
    function(err, article){
    if(err){
    res.send(err);
    } else {
    res.send(article);
    }
    }
);
});
// .patch(function(req,res){
//     Article.updateOne(
//         {title: req.params.articleTitle},
//         {$set: req.body},
//         function(err, article){
//             if(err){
//             res.send(err);
//             } else {
//             res.send(article);
//             }
//             }
//     );
// });
  
  
app.listen(3000, function(){
    console.log("Server started on port 3000");
});

