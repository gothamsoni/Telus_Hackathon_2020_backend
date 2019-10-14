const db = require('../Persistence/db');
const mapper = require('../Mappers/mappers');
const responses = require('../Models/ServerResponse');

function mapForm(assessmentInstance, form) {

    // Basic Project Details
    assessmentInstance.name = form.name;
    assessmentInstance.themeNumber = form.themeNumber;
    assessmentInstance.itssNumber = form.itssNumber;
    assessmentInstance.rppNumber = form.rppNumber;
    assessmentInstance.programName = form.programName;
    assessmentInstance.stack = form.stack;
    assessmentInstance.customerType = form.customerType;
    assessmentInstance.status = form.status;
    assessmentInstance.startDate = form.startDate;
    assessmentInstance.releaseDate = form.releaseDate;

    //"_comment2": "Additional Details",
    assessmentInstance.summary = form.summary;
    assessmentInstance.scope = form.scope;
    assessmentInstance.benefits = form.benefits;
    assessmentInstance.assumptions = form.assumptions;

    //"_comment3": "Contacts",
    assessmentInstance.projectManager = form.projectManager;
    assessmentInstance.e2eSolutionsArchitect = form.e2eSolutionsArchitect;
    assessmentInstance.e2eBsa = form.e2eBsa;

    //"_comment4": "Estimate",
    assessmentInstance.estimates = form.estimates;
    assessmentInstance.resourceProfile = form.resourceProfile;

}

function postForm(req, res) {
    return new Promise((resolve, reject) => {
        let submissionId = (req.query.submission) ? req.query.submission : undefined;

    })
}

function getForms(req, res) {
    return new Promise((resolve, reject) => {
        console.log("we are here")
        let jsonResult = {}
        let list = []
        db('mytable').select('*').then(function (data) {
            // console.log(data);
            return resolve(res.status(200).json(data));
        }).catch(function (error) {
            return reject(res.status(500).json({ Status: "Error", Message: error.message }))
        })
    })
}


function addHistory(originalForm, newForm) {

    var difference =
    {
        old: {},
        new: {}
    }

    var keys = ['name', 'themeNumber', 'itssNumber', 'rppNumber', 'programName', 'stack', 'customerType', 'status', 'startDate', 'releaseDate', 'summary', 'scope', 'benefits', 'assumptions', 'projectManager', 'e2eSolutionsArchitect', 'e2eSolutionsArchitect', 'estimates', 'resourceProfile']

    for (var key of keys) {
        if (originalForm[key] || newForm[key]) {
            if (JSON.stringify(originalForm[key]) !== JSON.stringify(newForm[key])) {
                difference.old[key] = originalForm[key];
                difference.new[key] = newForm[key];
            }
        }
    }

    if (!newForm.history) {
        newForm.history = []
    }

    var today = new Date();
    var date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;

    //var newVersion = Number([originalForm.history.length - 1]) + 1;

    var changes_to_add = {}
    changes_to_add._date = dateTime;
    changes_to_add.changes = JSON.stringify(difference)
    changes_to_add.author = newForm.author

    var history = originalForm.history ? originalForm.history : []
    history.push(changes_to_add)
    var newHistory = history.reverse()
    newForm.history = newHistory
    return newForm

}



module.exports = { postForm, getForms, mapForm, addHistory }