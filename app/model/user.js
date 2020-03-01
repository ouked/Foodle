'user strict';
const sql = require('./db.js');

let User = function (user) {
    // Set valid to true if all values provided.
    // Else false.
    // ADD NEW COLUMNS HERE
    this.valid =
        (this.username = user.username) &&
        (this.fName = user.fName) &&
        (this.lName = user.lName) &&
        (this.bathUsername = user.bathUsername);
    // TODO: SANITIZE INPUT!
};

User.create = function (newUser, result){
    delete newUser.valid;
    sql.query("INSERT INTO users SET ?", newUser, function(err, res) {
        if (err){
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log("Successfully added user "+newUser.fName+" "+newUser.lName+" ("+newUser.username+" : "+newUser.bathUsername+")");
            result(null, res.insertId);
        }
    });
};
User.getById = function (userId, result) {
    sql.query("SELECT * FROM users WHERE userID = ?", userId, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res)
        }
    });
};
User.getAll = function (result) {
    sql.query("SELECT * FROM users",  function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log("posts: ", res);

            result(null, res);
        }
    });
};
User.updateById = function (id, column, value, result) {
    sql.query("UPDATE users SET ? = ? WHERE userID = ?", [column, value, id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
User.remove = function(id, result){
    sql.query("DELETE FROM users WHERE userID = ?",[id], function (err, res) {
        if (err){
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
User.getByUsername = function (username, result){
    sql.query("SELECT * FROM users WHERE username =  ?", username, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
module.exports = User;
