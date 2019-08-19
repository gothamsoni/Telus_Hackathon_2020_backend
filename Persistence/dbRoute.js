const process = require('process');
require('dotenv').config();

//var dbRoute = 'mongodb+srv://gotham:gotham@cluster0-pzwf5.gcp.mongodb.net/assessments?retryWrites=true&w=majority'

var dbRoute = 'mongodb://localhost:27017/assessment_form'

module.exports = dbRoute;