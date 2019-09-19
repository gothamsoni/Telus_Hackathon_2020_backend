const express = require('express');
const router = express.Router();
const Multer = require('multer');
const imgUpload = require('../modules/imageUpload');
const uploadToDrive = require('../modules/uploadToDrive')
//const authorize = require('../modules/uploadToDrive')
const fs = require('fs');


// Handles the multipart/form-data
// Adds a .file key to the request object
// the 'storage' key saves the image temporarily for in memory
// You can also pass a file path on your server and it will save the image there
const multer = Multer({
  storage: Multer.MemoryStorage,
  fileSize: 10 * 1024 * 1024
});

router.post('/upload', multer.single('file'), function (req, res) {

  fs.readFile('credentials.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      // Authorize a client with credentials, then call the Google Drive API.
      uploadToDrive.authorize(JSON.parse(content), uploadToDrive.uploadFile, req.file);
    })
    res.send("File uploaded")

});

module.exports = router;

