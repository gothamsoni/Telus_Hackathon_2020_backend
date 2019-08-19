var exress = require('express');
var router = express.Router();
var db = require('./Persistence/db')

router.get('/', function(req, res){
    db('forms').select('index_key').then(function(result){
        res.render('index', {title: 'Welcome, '+ result[0]['email']})
    })
});

module.exports = router;