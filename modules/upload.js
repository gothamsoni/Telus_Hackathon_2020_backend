'use strict';

const fs = require('fs');
const readline = require('readline');

const {google} = require('googleapis');
const sampleClient = require('../sampleclient');

const drive = google.drive({
  version: 'v3',
  auth: sampleClient.oAuth2Client,
});

async function runSample(fileName) {
  const fileSize = fs.statSync(fileName).size;
  const res = await drive.files.create(
    {
      requestBody: {
        // a requestBody element is required if you want to use multipart
      },
      media: {
        body: fs.createReadStream(fileName),
      },
    },
    {
      // Use the `onUploadProgress` event from Axios to track the
      // number of bytes uploaded to this point.
      onUploadProgress: evt => {
        const progress = (evt.bytesRead / fileSize) * 100;
        readline.clearLine();
        readline.cursorTo(0);
        process.stdout.write(`${Math.round(progress)}% complete`);
      },
    }
  );
  console.log(res.data);
  return res.data;
}

// if invoked directly (not tests), authenticate and run the samples
if (module === require.main) {
  const fileName = process.argv[2];
  const scopes = ['https://www.googleapis.com/auth/drive.file'];
  sampleClient
    .authenticate(scopes)
    .then(() => runSample(fileName))
    .catch(console.error);
}

// export functions for testing purposes
module.exports = {
  runSample,
  client: sampleClient.oAuth2Client,
};