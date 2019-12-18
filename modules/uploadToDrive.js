const fs = require('fs');
const { google } = require('googleapis');
const readline = require('readline');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];

const TOKEN_PATH = 'token.json';

/**
 * Create an OAuth2 client with the given credentials, and then execute the given callback function.
 */
function authorize(credentials, callback, file) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getAccessToken(oAuth2Client, callback, file);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client, file);
    });
    
}

function getAccessToken(oAuth2Client, callback, file) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error retrieving access token', err);
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) return console.error(err);
          console.log('Token stored to', TOKEN_PATH);
        });
        callback(oAuth2Client, file);
      });
    });
  }
/**
* Describe with given media and metaData and upload it using google.drive.create method()
*/
function uploadFile(auth, file) {
    //console.log(file)
    const drive = google.drive({ version: 'v3', auth: auth });

    let stream = require('stream');
    
    let bufferStream = new stream.PassThrough();
    bufferStream.end(file.buffer);
    const fileMetadata = {
        'name': file.originalname
    };
    const media = {
        mimeType: file.type,
        body: bufferStream
    };
    drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id'
    }, (err, file) => {
        if (err) {
            // Handle error
            console.error(err);
        } else {
            console.log('File Id: ', file.id);
        }
    });
}

module.exports = { uploadFile, authorize };