'use strict';

const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const cors = require('cors');

app.use(cors());

app.get('/ping', function(req, res){
    const response = {
        message: "I'm an unauthenticated endpoint"
    };

    res.json(response);
});

app.get('/echo', function(req, res){
    const rawJwt = req.get('Authorization').replace(/bearer /gi, "");
    const jwtData = jwt.decode(rawJwt);

    const response = {
        message: "I reply with the decoded JWT token",
        jwt: jwtData
    };

    res.json(response);
});

module.exports = app;