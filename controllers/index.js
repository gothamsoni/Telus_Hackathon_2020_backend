var express = require('express');
var router = express.Router();
var db = require('../Persistence/db')
var Assessment = require('../Persistence/dataSchema').default

const SELECT_ALL_QUERY = 'SELECT * FROM forms';

// router.get('/', function(req, res){
//     db('mytable').select("*").then(function(result){
//         console.log(result[0]);
//         res.send(result[0]);
//         // res.render('index', {title: 'Welcome, '+ result[0]['email']})
//         // console.log(result);
//     })
//     .catch (function(error) {
//         console.log('you have been rejected', error);
//     })
// });

router.get('/getData', (req, res) => {
    Assessment.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
  });


module.exports = router;