const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AssessmentSchema = new Schema(

    {
        uuid: String,
        //"_comment1": "Basic Details",
        name: String,
        themeNumber: Number,
        itssNumber: Number,
        rppNumber: Number,
        programName: String,
        stack: String,
        customerType: String,
        status: String,
        startDate: String,
        releaseDate: Date,
    
        //"_comment2": "Additional Details",
        summary: String,
        scope: String,
        benefits: String,
        assumptions: String,
    
        //"_comment3": "Contacts",
        projectManager: String,
        e2eSolutionsArchitect: String,
        e2eBsa: String,

        estimates : Schema.Types.Mixed,

        resourceProfile: [Schema.Types.Mixed],

        author: String,

        history: Schema.Types.Mixed,
    
    },

    {collection: 'AForms'}
);

module.exports = mongoose.model("Assessment", AssessmentSchema);