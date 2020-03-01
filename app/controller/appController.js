'use strict';
const appModel = require("../model/appModel.js");

const Post = appModel.Post;
const User = appModel.User;

exports.list_all_posts = function(req, res) {
    Post.getAll(function (err, post) {
        if (err) {
            res.send(err);
            console.log("res", post);
        }
        res.send(post);
    });
};

exports.create_a_post = function(req, res) {
    const new_post = new Post(req.body);
    // Check all values for post have been submitted.
    if (!new_post.valid){
        res.status(400).send({error:true, message: 'Please provide a post '})
        console.log("Hello joe!");
    } else {
        Post.create(new_post, function(err, post) {
            if (err){
                res.send(err);
            }
            res.json(post);
        });
    }
};

exports.read_a_post = function(req, res){
    Post.getById(req.params.postID, function (err, post) {
        if(err){
            res.send(err);
        }
        res.json(post);
    });
};

exports.update_a_post = function(req, res){
    Post.updateById(req.params.postID, new User(req.body), function (err, post) {
        if(err){
            res.send(err);
        }
        res.json(post);
    });
};

exports.delete_a_post = function(req, res){
    Post.remove(req.params.postID, function (err, post) {
        if (err){
            res.send(err);
        }
        res.json({message: "Post successfully deleted."})
    })
};

// USER

exports.create_a_user = function(req, res) {
    const new_user = new User(req.body);
    // Check all values for post have been submitted.
    if (!new_user.valid){
        res.status(400).send({error:true, message: 'Please provide User data '})
        console.log("Hello joe!");
    } else {
         User.getByUsername(new_user.username, function(err, user){
             if (err){
                 res.send(err);
             }
             if (user.length > 0) {
                 res.json({message: "Username not available."});
                 return;
             }
             User.create(new_user, function(err, user) {
                 if (err){
                     res.send(err);
                 }
                 res.json(user);
             });
         })
    }
};

exports.read_a_user = function(req, res){
    User.getById(req.params.userID, function (err, user) {
        if(err){
            res.send(err);
        }
        res.json(user);
    });
};

exports.update_a_user = function(req, res){
    User.updateById(req.params.userID, new User(req.body), function (err, post) {
        if(err){
            res.send(err);
        }
        res.json(post);
    });
};

exports.delete_a_user = function(req, res){
    Post.remove(req.params.postID, function (err, post) {
        if (err){
            res.send(err);
        }
        res.json({message: "Post successfully deleted."})
    })
};
