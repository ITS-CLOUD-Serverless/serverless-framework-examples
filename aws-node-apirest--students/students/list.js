'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const params = {
  TableName: process.env.STUDENTS_TABLE,
};

module.exports.list = (event, context, callback) => {
  // fetch all Students from the database
  dynamoDb.scan(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the Students.',
      });
      return;
    }

    const resultsObj = {
      data: result.Items
    };

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(resultsObj),
    };
    callback(null, response);
  });
};
