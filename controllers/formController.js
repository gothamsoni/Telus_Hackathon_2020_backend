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
  services.mapForm(newAssessment, form);

  newAssessment.save().then(form => res.json(form))
});

router.post('/updateForm/:id', (req, res) => {
  const id = req.params.id;
  var query = Assessment.findOne({ _id: id });
  query.then(function (data) {
    var originalForm = data;
    
    var newForm = req.body

    const nform = services.addHistory(originalForm, newForm)

    console.log(nform)

    Assessment.findByIdAndUpdate(id, { $set: nform }, { upsert: true }, function (err, result) {
      if (err) {
        console.log(err);
      }
      console.log("RESULT: " + result);
      res.send('Done')
    });
  })

});

router.delete('/deleteForm/:id', (req, res) => {
  const id = req.params.id;

  Tank.deleteOne({ id: id }, function (err) {
    if (err) return handleError(err);
    // deleted at most one tank document
  });
});


module.exports = router;