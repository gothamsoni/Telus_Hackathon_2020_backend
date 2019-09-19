// var express = require('express');
// var router = express.Router();
// var services = require('../Services/formService')
// var fs = require('fs')
// var Image = require('../Persistence/imageSchema')


// var multer = require('multer');
// var os = require('os');
// var uuid = require('node-uuid');
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) { cb(null, os.tmpdir()) },
//   filename: function (req, file, cb) { cb(null, uuid.v4());}
// });
// // Create the multer instance here
// var upload = multer({ storage: storage, limits: { fileSize: 10 * 1024 * 1024}});

// router.post('/upload', upload.single('file'), function (req, res) {
//     var newImage = new Image();
    
//     newImage.img.data = fs.readFileSync(req.file.path)
//     console.log(newImage)
//     newImage.img.contentType = 'image/png';
//     newImage.save().then(image => res.json(image));
// });

// module.exports = router;