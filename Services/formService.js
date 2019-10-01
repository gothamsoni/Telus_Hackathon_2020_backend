const db = require('../Persistence/db');
const mapper = require('../Mappers/mappers');
const responses = require('../Models/ServerResponse');
const mappers = require('../Mappers/mappers.js');
var diff = require('deep-diff').diff;
var Assessment = require('../Persistence/dataSchema');
var _ = require('lodash');


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

function getObjectDiff(obj1, obj2) {
    const diff = Object.keys(obj1).reduce((result, key) => {
        if (!obj2.hasOwnProperty(key)) {
            result.push(key);
        } else if (_.isEqual(obj1[key], obj2[key])) {
            const resultKeyIndex = result.indexOf(key);
            result.splice(resultKeyIndex, 1);
        }
        return result;
    }, Object.keys(obj2));

    return diff;
}

function compare(a, b) {

    var result = {
        different: [],
        missing_from_first: [],
        missing_from_second: []
    };

    _.reduce(a, function (result, value, key) {
        if (b.hasOwnProperty(key)) {
            if (_.isEqual(value, b[key])) {
                return result;
            } else {
                if (typeof (a[key]) != typeof ({}) || typeof (b[key]) != typeof ({})) {
                    //dead end.
                    result.different.push(key);
                    return result;
                } else {
                    var deeper = compare(a[key], b[key]);
                    result.different = result.different.concat(_.map(deeper.different, (sub_path) => {
                        return key + "." + sub_path;
                    }));

                    result.missing_from_second = result.missing_from_second.concat(_.map(deeper.missing_from_second, (sub_path) => {
                        return key + "." + sub_path;
                    }));

                    result.missing_from_first = result.missing_from_first.concat(_.map(deeper.missing_from_first, (sub_path) => {
                        return key + "." + sub_path;
                    }));
                    return result;
                }
            }
        } else {
            result.missing_from_second.push(key);
            return result;
        }
    }, result);

    _.reduce(b, function (result, value, key) {
        if (a.hasOwnProperty(key)) {
            return result;
        } else {
            result.missing_from_first.push(key);
            return result;
        }
    }, result);

    return result;
}

function difference1(object, base) {
    function changes(object, base) {
        return _.transform(object, function (result, value, key) {
            if (!_.isEqual(value, base[key])) {
                result[key] = (_.isObject(value) && _.isObject(base[key])) ? changes(value, base[key]) : value;
            }
        });
    }
    return changes(object, base);
}

function addHistory(originalForm, newForm) {

    var difference = []

    var keys = ['name', 'themeNumber', 'itssNumber', 'rppNumber', 'programName', 'stack', 'customerType', 'status', 'startDate', 'releaseDate', 'summary', 'scope', 'benefits', 'assumptions', 'projectManager', 'e2eSolutionsArchitect', 'e2eSolutionsArchitect', 'estimates', 'resourceProfile']

    for (var key of keys) {
        if (originalForm[key] || newForm[key]) {
            if (JSON.stringify(originalForm[key]) !== JSON.stringify(newForm[key])) {
                difference.push({
                    old: { [key]: originalForm[key] },
                    new: { [key]: newForm[key] }
                })
            }
        }
    }

    if (!newForm.history) {
        newForm.history = [{ _date: 0, changes: {}, author: '' }]
    }

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

    //var newVersion = Number([originalForm.history.length - 1]) + 1;

    var changes_to_add = {}
    changes_to_add._date = today;
    changes_to_add.changes = JSON.stringify(difference)
    changes_to_add.author = newForm.author
    

    var history = originalForm.history
    history.push(changes_to_add)
    newForm.history = history
    return newForm

}



module.exports = { postForm, getForms, mapForm, addHistory }