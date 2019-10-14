var express = require('express');
var router = express.Router();
var services = require('../Services/formService')
var Assessment = require('../Persistence/dataSchema')


router.get("/search_assessment/:query", function (req, res) {
    var query = req.params.query
    console.log(query)

    Assessment.search({
        query_string: {
            query: query //"john"
        },
    }, function (err, results) {
        if (err) {
            return res.json({ success: false, error: err })
        }
        var searchResult = []
        for (var item of results.hits.hits) {
            if (item._source) {
                var obj = item._source;
                obj._id = item._id
                searchResult.push(obj)
            }
        }
        // console.log(results.hits.hits)
        //console.log(searchResult)
        return res.json({ success: true, data: searchResult }) // results here
    });
})

module.exports = router;
