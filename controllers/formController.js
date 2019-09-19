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

router.post('/putForm', (req, res) => {
  let newAssessment = new Assessment();

  const { form } = req.body;

  newAssessment.name = form.name;
  newAssessment.themeNumber = form.themeNumber;
  newAssessment.itssNumber = form.itssNumber;
  newAssessment.rppNumber = form.rppNumber;
  newAssessment.programName = form.programName;
  newAssessment.stack = form.stack;
  newAssessment.customerType = form.customerType;
  newAssessment.status = form.status;
  newAssessment.startDate = form.startDate;
  newAssessment.releaseDate = form.releaseDate;

  //"_comment2": "Additional Details",
  newAssessment.summary = form.summary;
  newAssessment.scope = form.scope;
  newAssessment.benefits = form.benefits;
  newAssessment.assumptions = form.assumptions;

  //"_comment3": "Contacts",
  newAssessment.projectManager = form.projectManager;
  newAssessment.e2eSolutionsArchitect = form.e2eSolutionsArchitect;
  newAssessment.e2eBsa = form.e2eBsa;

  //"_comment4": "Estimate",
  newAssessment.estimates = form.estimates;
  newAssessment.resourceProfile = form.resourceProfile;
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

router.delete('/deleteForm/:id', (req, res) => {
  const id = req.params.id;

  Tank.deleteOne({ id: id }, function (err) {
    if (err) return handleError(err);
    // deleted at most one tank document
  });
});


module.exports = router;