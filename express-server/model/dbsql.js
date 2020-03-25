'user strict';

var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    database: 'retest',
    host: "localhost",
    user: "root",
    password: "8CFmTxG4r5oSS7IYvT2N"
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
