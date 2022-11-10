'use strict';

const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.reader = (callback, responseHttp, resourceId = null) => {
    
    let params = {
        TableName: process.env.BOOKING_TABLE,
    };
    
    dynamoDb.scan(params, (error, result) => {
            // handle potential errors
        console.log("SCAN");
        if (error) {
            console.error(error);
            callback(null, {
                ...responseHttp,
                statusCode: error.statusCode || 501,
                body: JSON.stringify({ 
                    message : 'Couldn\'t fetch the resource item.'
                }),
            });
        }
            
        callback(null, {
            ...responseHttp,
            statusCode: 200,
            body: JSON.stringify(result.Items || []),
        });
    });
};
