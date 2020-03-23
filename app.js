var express = require("express"),
        app = express(),
 bodyParser = require("body-parser"),
   mongoose = require("mongoose"),
   methodOverride = require("method-override");

// APP config
mongoose.connect("mongodb+srv://spicysos:978645zz@cluster0-sqgci.mongodb.net/test?retryWrites=true&w=majority");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));

// Mongoose/model config
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created:{type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);
// var UserSchema = new mongoose.Schema({
//     email: String,
//     name: String,

// });
// var User = mongoose.model("User", UserSchema);
// var postSchema = new mongoose.Schema({
//     title: String,
//     conotent: String
// });
// var Post = mongoose.model("Post", postSchema);



// Blog.create({
//     title: "Test Blog",
//     image: "https://images.freeimages.com/images/large-previews/407/dogs-1403621.jpg",
//     body: "This is a cute very very cute dog! hehe ",
// }, function(error, blog){
//     	if (error) console.log(error);
//     	else {
//     		console.log("newly created campground!", blog)
//     	}
// })
// RESTful routes

// INDEX route
app.get("/blogs", function(req,res){
    Blog.find({}, function(err, blogs){
        if (err) {
            console.log(err);
        } else {
            console.log(blogs);
            res.render("index", {data: blogs})
        }
    })
});

// NEW route
app.get("/blogs/new", function(req,res){
    res.render("new");
})

//CREATE route
app.post("/blogs",function(req,res){
    Blog.create(req.body.blog,function(err, newBlog){
        if (err) {
            res.render("new")
        } else {
            res.redirect("/blogs")
        }
    })
});
// SHOW route
app.get("/blogs/:id",function(req,res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if (err) {
            res.redirect("/blogs")
        } else {
            res.render("show", {blog: foundBlog})
        }
    })
    
})

//EDIT Route
app.get("/blogs/:id/edit", function(req,res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if (err) {
            console.log(err)
        }else{
            res.render("edit", {blog:foundBlog})
        }
    })
});

// UPDATE Route
app.put("/blogs/:id", function(req,res){
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if (err) {
            res.redirect("/blogs")
        }else{
            res.redirect(`/blogs/${req.params.id}`)
        }
    })
});

// DELETE Route
app.delete("/blogs/:id", function(req,res){
    //destroy the blog and redirect
    Blog.findByIdAndRemove(req.params.id, function(err){
        if (err) res.redirect("/blogs")
        else res.redirect("/blogs")
    })

})



// Root route
app.get("/", function(req,res) {
    res.redirect("/blogs");
})


app.listen(3000,function(){
    console.log("server is running.")
});
