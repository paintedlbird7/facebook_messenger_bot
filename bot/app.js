/* jshint node: true, devel: true */
'use strict';

const 
  bodyParser = require('body-parser'),
  config = require('config'),
  crypto = require('crypto'),
  express = require('express'),
  https = require('https'),  
  request = require('request');

var app = express();
app.set('port', 5000);
app.set('view engine', 'ejs');
app.use(express.static('public'));

/*
 * Open config/default.json and set your config values before running this server
 * You can restart the node server without reconfiguring anything
 * However, whenever you restart ngrok you must (in this order):
 *   1. reset the serverURL param in config\default.json
 *   2. restart this node server 
 *   3. revalidate the webhook url in your App Dashboard
 */

// App Dashboard > Dashboard > click the Show button in the App Secret field
const APP_SECRET = config.get('appSecret');

// App Dashboard > Webhooks > Edit Subscription > copy whatever random value you decide to use in the Verify Token field
const VALIDATION_TOKEN = config.get('validationToken');

// App Dashboard > Messenger > Settings > Token Generation > select your page > copy the token that appears
const PAGE_ACCESS_TOKEN = config.get('pageAccessToken');

// Get this from your ngrok console but leave out the 'https://'
// DO NOT INCLUDE THE PROTOCOL, it should just be [subdomain].ngrok.io
const SERVER_URL = config.get('serverURL');

// Avoid accidental misconfiguration by hard coding the protocol
const IMG_BASE_PATH = 'https://' + SERVER_URL + "/assets/screenshots/";

// make sure that everything has been properly configured
if (!(APP_SECRET && VALIDATION_TOKEN && PAGE_ACCESS_TOKEN && SERVER_URL)) {
  console.error("Missing config values");
  process.exit(1);
}

/*
 * Start your server
 */
app.listen(app.get('port'), function() {
  console.log('[app.listen] Node app is running on port', app.get('port'));
});

module.exports = app;
