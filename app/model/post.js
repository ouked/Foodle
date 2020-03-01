'user strict';
const sql = require('./db.js');

let Post = function (post) {
    // Set valid to true if all values provided.
    // Else false.
    // ADD NEW COLUMNS HERE
    this.valid =
        (this.title = post.title) &&
        (this.photo = post.photo) &&
        (this.description = post.description) &&
        (this.contactDetails = post.contactDetails) &&
        (this.userID = post.userID) &&
        (this.location = post.location);
};

Post.create = function (newPost, result){
    delete newPost.valid;
    sql.query("INSERT INTO posts SET ?", newPost, function(err, res) {
        if (err){
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};
Post.getById = function (postId, result) {
    sql.query("SELECT post FROM posts WHERE postID = ?", postId, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, err);
        }
    });
};
Post.getAll = function (result) {
    sql.query("SELECT * FROM posts",  function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log("posts: ", res);

            result(null, res);
        }
    });
};
Post.updateById = function (id, column, value, result) {
    sql.query("UPDATE posts SET ? = ? WHERE postID = ?", [column, value, id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Post.remove = function(id, result){
    sql.query("DELETE FROM posts WHERE postID = ?",[id], function (err, res) {
        if (err){
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
module.exports = Post;
