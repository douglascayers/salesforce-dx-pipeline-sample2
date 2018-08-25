'use strict';

// ==============================================
// Load libraries
// ==============================================

// https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback
// https://stackoverflow.com/questions/20643470/execute-a-command-line-binary-with-node-js

const jsforce  = require('jsforce');
const express  = require('express');
const util     = require('util');
const exec     = util.promisify(require('child_process').exec);


// Salesforce OAuth Settings (reusable)
// ==============================================

var oauth2 = new jsforce.OAuth2({
    loginUrl : process.env.OAUTH_SALESFORCE_LOGIN_URL,
    clientId : process.env.OAUTH_SALESFORCE_CLIENT_ID,
    clientSecret : process.env.OAUTH_SALESFORCE_CLIENT_SECRET,
    redirectUri : process.env.OAUTH_SALESFORCE_REDIRECT_URI
});


// ==============================================
// Configure web app to respond to requests
// ==============================================

var app = express();

app.listen( process.env.PORT || 8080 );

app.get( '/', function( req, res ) {

    res.redirect( oauth2.getAuthorizationUrl( { scope : 'id' } ) );

});

/**
 * Receives oauth callback from Salesforce, hopefully, with authorization code.
 */
app.get( '/oauth2/callback', function( req, res ) {

    // in testing, browsers would send a duplicate request after 5 seconds
    // if this redirection did not respond in time.
    // to avoid having a duplicate request we must tell the browser to wait longer
    // https://github.com/expressjs/express/issues/2512
    req.connection.setTimeout( 1000 * 60 * 10 ); // ten minutes

    // initialize salesforce client for making the oauth authorization request
    var sfClient = new jsforce.Connection({ oauth2 : oauth2 });

    // salesforce oauth authorize request to get access token
    sfClient.authorize( req.query.code, function( err, userInfo ) {

        if ( err ) {

            handleError( err, res );

        } else {

            try {

                // TODO get from heroku config the org this pipeline's stage represents
                // TODO use sfdx cli to auth into that org
                // TODO use sfdx cli to display url to get into the org
                // TODO use express to redirect to the org's url

                // debug, remove these lines later
                console.log( 'userInfo', userInfo );
                res.redirect( userInfo.url );

            } catch ( err ) {

                handleError( err, res );

            }

        }

    });

});

/**
 * Helper function to log error to console then write to response.
 */
function handleError( err, res ) {

    console.error( err );

    res.status( 403 ).send( 'Unexpected internal error' );

};