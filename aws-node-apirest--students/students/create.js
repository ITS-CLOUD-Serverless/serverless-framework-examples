'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  // check existance of all properties needed to create a student obj
  const hasProperties = () => data === null || data === undefined ? false : (data.hasOwnProperty('firstName') && data.hasOwnProperty('lastName') && data.hasOwnProperty('course'));

  // check is all properties needed are strings
  const isString = () => !hasProperties() ? hasProperties() : (typeof data.firstName === 'string'
    && typeof data.lastName === 'string'
    && typeof data.course === 'string'
    && data.firstName !== ''
    && data.lastName !== ''
    && data.course !== '');

  // validates if data has properties and if those properties are of type string
  if (!isString()) {
    console.error('Validation Failed');
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t create the Student.',
    });
    return;
  }

  const { firstName, lastName, course } = data;

  const params = {
    TableName: process.env.STUDENTS_TABLE,
    Item: {
      id: uuid.v1(),
      firstName,
      lastname,
      course,
      voteAvg: 6,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  // write the todo to the database
  dynamoDb.put(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t create the Student.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
};
