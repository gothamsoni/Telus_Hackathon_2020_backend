const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ModuleSchema = new Schema(

    {
        //"_comment1": "Basic Details",
        name: String,
        type: Number,
        services: Number,
        action: Number,
        version: String,
        description: String,
        system: String,
        stack: String,
        entryPoint: String,    
    },

    {collection: 'Modules'}
);

module.exports = mongoose.model("Module", ModuleSchema);