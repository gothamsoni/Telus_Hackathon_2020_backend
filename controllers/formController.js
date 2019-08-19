var express = require('express');
var router = express.Router();
var services = require('../Services/formService')
var Assessment = require('../Persistence/dataSchema')

router.get('/getForm', function (req, res) {
  Assessment.find((err, data) => {
    if (err) {
      return res.json({ success: false, error: err })
    }
    return res.json({ success: true, data: data })
  })
})

// router.post('/updateForm', (req, res) => {
//   const { uuid, update } = req.body;
//   Assessment.findByIdAndUpdate(uuid, update, (err) => {
//     if (err) return res.json({ success: false, error: err });
//     return res.json({ success: true });
//   });
// });

router.delete('/deleteForm', (req, res) => {
  const { uuid } = req.body;
  Data.findByIdAndRemove(uuid, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

router.post('/putForm', (req, res) => {
  let newAssessment = new Assessment();

  const {
    name, themeNumber, itssNumber, rppNumber, programName, stack, customerType, status, startDate, releaseDate,
    summary, scope, benefits, assumptions,
    projectManager, e2eSolutionsArchitect, e2eBsa,
    estimates, resourceProfile } = req.body;

  newAssessment.name = name;
  newAssessment.themeNumber = themeNumber;
  newAssessment.itssNumber = itssNumber;
  newAssessment.rppNumber = rppNumber;
  newAssessment.programName = programName;
  newAssessment.stack = stack;
  newAssessment.customerType = customerType;
  newAssessment.status = status;
  newAssessment.startDate = startDate;
  newAssessment.releaseDate = releaseDate;

  //"_comment2": "Additional Details",
  newAssessment.summary = summary;
  newAssessment.scope = scope;
  newAssessment.benefits = benefits;
  newAssessment.assumptions = assumptions;

  //"_comment3": "Contacts",
  newAssessment.projectManager = projectManager;
  newAssessment.e2eSolutionsArchitect = e2eSolutionsArchitect;
  newAssessment.e2eBsa = e2eBsa;

  //"_comment4": "Estimate",
  newAssessment.estimates = estimates;
  newAssessment.resourceProfile = resourceProfile;
  newAssessment.save().then(form => res.json(form))
});

router.post('/updateForm/:id', (req, res) => {
  const id = req.params.id;

  Assessment.findByIdAndUpdate(id, { $set: req.body }, { upsert: true }, function (err, result) {
    if (err) {
      console.log(err);
    }
    console.log("RESULT: " + result);
    res.send('Done')
  });

});


module.exports = router;