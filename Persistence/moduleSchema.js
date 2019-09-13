const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ModuleSchema = new Schema(

    {
        //"_comment1": "Basic Details",
        name: String,
        type: String,
        services: String,
        action: String,
        version: String,
        description: String,
        system: String,
        stack: String,
        entryPoint: String,    
    },

    {collection: 'Modules'}
);

module.exports = mongoose.model("AssessmentModule", ModuleSchema);