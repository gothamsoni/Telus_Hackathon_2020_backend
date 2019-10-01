const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ModuleSchema = new Schema(

    {
        name: String,
        dateCreated: Date,
        description: String,
        status: String,
        type: String,
        subtype: String,
        services: String,
        operations : String,
        hardware: String,
        stack: String,
        assessments: String,
        consumer: String,
        provider: String,
        notes: String,
        //"_comment":"need to still added fields for CI/CD"
    },

    {collection: 'Modules'}
);

module.exports = mongoose.model("AssessmentModule", ModuleSchema);

// const ModuleSchema = new Schema(

//     {
//         //"_comment1": "Basic Details",
//         name: String,
//         type: String,
//         services: String,
//         action: String,
//         version: String,
//         description: String,
//         system: String,
//         stack: String,
//         entryPoint: String,    
//     },

//     {collection: 'Modules'}
// );

// module.exports = mongoose.model("AssessmentModule", ModuleSchema);