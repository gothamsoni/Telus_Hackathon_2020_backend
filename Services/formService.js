const db = require('../Persistence/db');
const mapper = require('../Mappers/mappers');
const responses =  require('../Models/ServerResponse');
const mappers = require('../Mappers/mappers.js');


function postForm(req, res){
    return new Promise((resolve, reject) => {
        let submissionId = (req.query.submission) ? req.query.submission: undefined;
        
    })
}

function getForms(req, res){
    return new Promise((resolve, reject)=>{ 
        console.log("we are here")
        let jsonResult = {}
        let list = []
        db('mytable').select('*').then(function(data){
            // console.log(data);
            return resolve(res.status(200).json(data));
        }).catch(function(error){
            return reject(res.status(500).json({Status:"Error", Message: error.message}))
        })
    })
}


module.exports = { postForm, getForms}