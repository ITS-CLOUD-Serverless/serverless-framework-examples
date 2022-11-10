'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.writer = (callback, responseHttp, bodyRequest, resourceId = null) => {
    
    const timestamp = new Date().getTime();
    
    const data = JSON.parse(bodyRequest);

    const {
        startDate,
        endDate,
        roomNumber,
        customers,
        children
    } = data;

    

    let params = {
        TableName: process.env.BOOKING_TABLE,
        Item: {
            id: uuid.v1(),
            startDate,
            endDate,
            roomNumber,
            customers,
            children,
            createdAt: timestamp,
            updatedAt: timestamp,
        },
    };
    
    dynamoDb.put(params, (error) => {
        // handle potential errors
        if (error) {
            console.error(error);
            callback(null, {
                ...responseHttp,
                statusCode: error.statusCode || 501,
                body: 'Couldn\'t create the resource item.',
            });
            return;
        }

        // create a response
        const response = {
            ...responseHttp,
            statusCode: 201,
            body: JSON.stringify(params.Item),
        };
        callback(null, response);
    });
};
