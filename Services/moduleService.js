const db = require('../Persistence/db');
const mapper = require('../Mappers/mappers');
const responses = require('../Models/ServerResponse');
const mappers = require('../Mappers/mappers.js');
var diff = require('deep-diff').diff;
var Assessment = require('../Persistence/dataSchema');
var _ = require('lodash');


function mapModule(moduleInstance, newModule) {

    moduleInstance.name = newModule.name
    moduleInstance.dateCreated = newModule.dateCreated;
    moduleInstance.description = newModule.description;
    moduleInstance.status = newModule.status;
    moduleInstance.type = newModule.type;
    moduleInstance.subtype = newModule.subtype;
    moduleInstance.services = newModule.services;
    moduleInstance.operations = newModule.operations;
    moduleInstance.hardware = newModule.hardware;
    moduleInstance.stack = newModule.stack;
    moduleInstance.assessments = newModule.assessments;
    moduleInstance.consumer = newModule.consumer;
    moduleInstance.provider = newModule.provider;
    moduleInstance.notes = newModule.notes;

}
module.exports = { mapModule }