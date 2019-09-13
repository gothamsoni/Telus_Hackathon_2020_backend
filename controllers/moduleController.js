var express = require('express');
var router = express.Router();
var services = require('../Services/formService')
var AssessmentModule = require('../Persistence/moduleSchema')

// Router function to get modules from the database

router.get('/getModules', function (req, res) {
  AssessmentModule.find((err, data) => {
    if (err) {
      return res.json({ success: false, error: err })
    }
    return res.json({ success: true, data: data })
  })
});


// Router function to post a new module
router.post('/putModule', (req, res) => {
  let nModule = new AssessmentModule();

  const { newModule } = req.body;
  //console.log(newModule);
  
  nModule.name = newModule.name;
  nModule.type = newModule.type;
  nModule.services = newModule.services;
  nModule.action = newModule.action;
  nModule.version = newModule.version;
  nModule.description = newModule.description;
  nModule.system = newModule.system;
  nModule.stack = newModule.stack;
  nModule.entryPoint = newModule.entryPoint;  

  console.log(nModule)
  
  nModule.save().then(form => res.json(form))
});


// Router function to update a module 

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

  Assessment.deleteOne({ id: id }, function (err) {
    if (err) return handleError(err);
    // deleted at most one tank document
  });

  
});


module.exports = router;