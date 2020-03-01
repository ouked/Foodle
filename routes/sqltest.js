var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "foodshare"
});

let data = "";

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM users", function (err, result, fields) {
    if (err) throw err;
    data = result[0].username;
    console.log(result);
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('display', { title: 'Express', data: data });
});

module.exports = router;
