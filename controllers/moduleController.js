var express = require('express');
var router = express.Router();
var services = require('../Services/moduleService')
var AssessmentModule = require('../Persistence/moduleSchema')

// Router function to get modules from the database

router.get('/getModules/:sortBy/:order', function (req, res) {
  var { sortBy, order } = req.params;
  AssessmentModule.find((err, data) => {
    if (err) {
      return res.json({ success: false, error: err })
    }
    if(sortBy){
      if(order === "desc"){
          data.sort((a, b) => (a[sortBy] > b[sortBy]) ? 1 : -1);
      }
      if(order === "asc"){
          data.sort((a, b) => (a[sortBy] > b[sortBy]) ? -1 : 1);
      }
    }
    return res.json({ success: true, data: data })
  })
});

// Router function to post a new module
router.post('/putModule', (req, respose) => {
  let nModule = new AssessmentModule();
  const { newModule } = req.body;
  //console.log(newModule);
  services.mapModule(nModule, newModule);

  nModule.save(function(err){
    if (err) throw err;
    /* Document indexation on going */
    nModule.on('es-indexed', function(err, res){
      if (err) throw err;
      // console.log('model added to es index');
      respose.send('Done')
      /* Document is indexed */
      });
    });
  
  // nModule.save().then(form => res.json(form))
});


// Router function to update a module 

router.post('/updateModule/:id', (req, res) => {
  const id = req.params.id;
  console.log(req.body.module)
  AssessmentModule.findByIdAndUpdate(id, { $set: req.body.module }, { upsert: true }, function (err, result) {
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