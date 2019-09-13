const express = require('express');
const router = express.Router();
const Multer = require('multer');
const imgUpload = require('../modules/imageUpload');

// Handles the multipart/form-data
// Adds a .file key to the request object
// the 'storage' key saves the image temporarily for in memory
// You can also pass a file path on your server and it will save the image there
const multer = Multer({
  storage: Multer.MemoryStorage,
  fileSize: 10 * 1024 * 1024
});

// the multer accessing the key 'image', as defined in the `FormData` object on the front end
// Passing the uploadToGcs function as middleware to handle the uploading of request.file
router.post('/uploadImage', multer.single('file'), imgUpload.uploadToGcs, function(request, response, next) {
  const data = request.body;
  
  if (request.file && request.file.cloudStoragePublicUrl) {
    data.imageUrl = request.file.cloudStoragePublicUrl;
  }
  response.send(data);
});

module.exports = router;

// const format = require('util').format;
// const Multer = require('multer');
// const helmet = require('helmet');
// const {Storage} = require('@google-cloud/storage');   // google cloud sdk
// const storage = new Storage();
// var express = require('express');
// var router = express.Router();

// const multer = Multer({
//     storeage: Multer.memoryStorage(),
//     limits:{
//         fileSize: 10 * 1024 * 1024   // no larger than 10 mb
//     }
// })

// var bucketname = 'assessment-bucket';

// const bucket = storage.bucket(bucketname);

// router.post('/uploadImage', multer.single('file'), (req, res, next) =>{
//     if(!req.file) {
//         res.status(400).send('No file uploaded.');
//         return;
//     }

//     //console.log("WE ARE IN THE CONTROLLER")

//     // Create a new blob in the bucket and upload the file data.
//     const blob = bucket.file(req.file.originalname);
//     const blobStream = blob.createWriteStream();

//     blobStream.on('error', (err) => {
//         next(err);
//     });

//     blobStream.on('finish', () =>{
//         // The public URL to access the file via HTTP.
//         const publicUrl = format(`https://console.cloud.google.com/storage/browser/assessment-bucket`);
//         console.log(publicUrl)
//         res.status(200).send(publicUrl);
//     });

//     blobStream.end(req.file.buffer);
// });

// module.exports = router;