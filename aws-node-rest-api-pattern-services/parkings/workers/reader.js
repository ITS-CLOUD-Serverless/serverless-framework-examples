'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.reader = async (resourceId = null) => {
    
    let params = {
        TableName: process.env.BOOKING_TABLE,
    };
    try {
        await dynamoDb.scan(params, (error, result) => {
            // handle potential errors
            console.log("SCAN");
            if (error) {
                console.error(error);
                return {
                    code: error.statusCode || 501,
                    body: { 
                        message : 'Couldn\'t fetch the resource item.'
                    },
                };
            }
            
                // create a response
            return {
                code: 200,
                body: result.Items,
            };
        });
    } catch (error) {
        console.log("CATCH");
        console.error(error);
    }
};
