'use strict';

const awsServerlessExpress = require('aws-serverless-express');
const app = require('./app');

// AWS Environment specifics
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);

const server = awsServerlessExpress.createServer(app);
exports.index = (event, context) => awsServerlessExpress.proxy(server, event, context);