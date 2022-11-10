'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const writer = (resourceData, resourceId = null) => {
    return {
        code: 200,
        boby: 'OK'
    }
};

module.exports.writer = writer;