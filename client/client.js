const COGNITO_DOMAIN = "https://DOMAIN.auth.REGION.amazoncognito.com";

const OAUTH2_CLIENT_ID = "CLIENTID";
const OAUTH2_CLIENT_SECRET = "SECRETS";

const PROTECTED_SERVICE_URL = "https://ID.execute-api.REGION.amazonaws.com/STAGE/echo";


//============================================================================
//-- DO NOT EDIT BELOW THIS POINT --------------------------------------------

const ClientOAuth2 = require('client-oauth2');
const jwt = require('jsonwebtoken');
const request = require('superagent');

const oauthClient = new ClientOAuth2({
    clientId: OAUTH2_CLIENT_ID,
    clientSecret: OAUTH2_CLIENT_SECRET,
    // Reference: https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-userpools-server-contract-reference.html
    accessTokenUri: COGNITO_DOMAIN + "/oauth2/token",
    scopes: []
});

oauthClient.credentials.getToken()
.then(result => {
    // Display the decoded token to the user running the script
    const token = result.data.access_token;
    const jwtData = jwt.decode(token);

    console.log(JSON.stringify(jwtData,null,4), "\n");

    return result;
})
.then(async result => {
    // Demonstrate use by making a request to API Gateway
    console.log("Making request WITHOUT token to: " + PROTECTED_SERVICE_URL);
    await request
        .get(PROTECTED_SERVICE_URL)
        .send()
        .then(res => {
            console.log("Request success");
        })
        .catch((err, res) => {
            console.log(err.message, "\n");
        });

    // Demonstrate use by making a request to API Gateway
    console.log("Making request WITH token to: " + PROTECTED_SERVICE_URL);
    await request
        .get(PROTECTED_SERVICE_URL)
        .set('Authorization', 'Bearer ' + result.data.access_token)
        .set('accept', 'json')
        .send()
        .then(res => {
            const response = JSON.parse(res.text);

            console.log(JSON.stringify(response,null,4), "\n");
        })
        .catch((err, res) => {
            console.log(err.message, "\n");
        });

}).catch((err, res) => {
    console.log(err.message);
});

