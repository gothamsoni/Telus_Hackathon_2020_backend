const process = require('process');
require('dotenv').config();


// var host = `/cloudsql/${process.env.DB_HOST}`
// var db = require('knex')({
//     client: 'pg',
//     connection:{
//         host    : host,
//         user    : process.env.DB_USER,
//         password: process.env.DB_PASS,
//         database: process.env.DB_DATABASE
//     }
// });

//var dbRoute = 'mongodb+srv://gotham:gotham@cluster0-pzwf5.gcp.mongodb.net/test?retryWrites=true&w=majority'

var db = require('knex')({
    client: 'pg',
    connection:{
        host    : 'localhost',
        user    : 'postgres',
        password: 'gotham',
        database: 'postgres'
    }
});

// require('knex').connect();

module.exports = db;