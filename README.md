Demo: Cognito User Pools
========================

This is a quick and nasty demonstration of how to protect a REST API with Cognito (User Pools).

Authored by [Will Dowling](https://github.com/dowlingw) at [KZN Group](https://kzn.io/).


Getting Started
---------------
To get started, you'll need to download and install the following tools:

-    [Serverless Framework](https://serverless.com/framework/docs/getting-started/)
-    [assume-role](https://github.com/remind101/assume-role) (Optional)


Deployment
----------

1.    Run the following command to deploy the Serverless stack to an AWS account you control:
 
          assume-role AWS_CLI_ROLE_NAME sls deploy

2.    (Optional) Configure a SAML idP in the User Pool to Azure AD using the following guides:
      https://www.info.nordcloud.com/tech-blog/setting-up-azure-ad-federation-with-aws-cognito
      https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-integrating-3rd-party-saml-providers.html

3.    Configure a domain for your Cognito User Pool using the following guide:
      https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-assign-domain.html

4.    Create a sample Resource Server and define some sample scopes using the following guide:
      https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-define-resource-servers.html  

5.    Edit the "spaClient" application client and make the following changes:

      1. Select one or more idPs the application client will allow authentication from
      2. Set the "Callback URL" (OAuth 2.0 `redirect_uri`) to `http://localhost:8080/`
      3. Set the "Sign out URL" to `https://kzn.io`
      4. Select the "Implicit grant" under the "Allowed OAuth Flows"
      5. Select all the checkboxes under "Allowed OAuth Scopes"
      6. Select one or more of the checkboxes under "Allowed Custom Scopes"
      
6.    Edit the "m2mClient" application client and make the following changes:

      1. Select the "Client credentials" under the "Allowed OAuth Flows"
      2. Select one or more of the checkboxes under "Allowed Custom Scopes" 

7.    View the "App clients" under the "General Settings" section and note down the client id and secrets for both clients

8.    Create a user in the user pool via the console using the following guide:
      https://docs.aws.amazon.com/cognito/latest/developerguide/how-to-create-user-accounts.html

9.    Configure the CLI Client by editing the `client/client.js` file and specify the following values:

      1. `COGNITO_DOMAIN` - The domain name configured for the Cognito User pool
      2. `OAUTH2_CLIENT_ID` - The Client ID for the "m2mClient" application client
      3. `OAUTH2_CLIENT_SECRET` - The Client Secret for the "m2mClient" application client
      4. `PROTECTED_SERVICE_URL` - The URL to the `echo` resource in the deployed API Gateway 

10.    Configure the SPA Client by editing:

       1.  `spa/src/main.js` and specify the following values:
           1. `authorizationEndpoint` - The URL to the Authorization endpoint, in the form of: `https://COGNITO_USER_POOL_DOMAIN/oauth2/authorize`
           2. `clientId` - The Client ID for the "spaClient" application client
          
       2.  `spa/src/components/CognitoDemo.vue` and specify the following values:
           1. `ping.url` - The URL to the `ping` resource in API Gateway
           2. `echo.url` - The URL to the `echo` resource in API Gateway


Running the demos
-----------------

### CLI Client: Client credential grant

1.    Run the following command from the `client` directory:

          node client/client.js
    
### SPA Application: Implicit grant

1.    Run the following command from the `spa` directory:

          npm run serve
          
2.    Open your web browser and navigate to the URL provided in the console output


Helpful resources
-----------------

-    [RFC 6749: OAuth 2.0](https://tools.ietf.org/html/rfc6749)
-    [Diagrams & Movies of OAuth 2 flows](https://medium.com/@darutk/diagrams-and-movies-of-all-the-oauth-2-0-flows-194f3c3ade85)
-    [OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-core-1_0.html)
-    [OAuth Discovery](https://tools.ietf.org/html/draft-ietf-oauth-discovery-06)


Kaizen / Contributing
---------------------
This project is not maintained, but happily accepts pull requests. If you find some value in this demonstration, please
feel free to head over to the GitHub issues page where there are issues for some desirable improvements.


License
-------
This project is licensed under the MIT license, please refer to the `LICENSE` file for full license text.


KZN Group
---------
KZN is an AWS Advanced Consulting Partner based in Perth, Western Australia and our mission is to simplify the lives of
our customers.

If you're in need of an experienced and pragmatic partner in your project, or anything else - why not
[get in touch](https://kzn.io/)?