'use strict';

const AWS = require('aws-sdk');

const isTest = process.env.JEST_WORKER_ID;
const isDevelopment = process.env.NODE_ENV !== 'production';
const setupLocal = isTest || isDevelopment;
const config = {
  convertEmptyValues: true,
  region: "sa-east-1",
  ...(setupLocal && {
    sslEnabled: false,
    region: 'local-env',
    secretAccessKey: 'secr3tKey'
  }),
  ...(isDevelopment && {
    accessKeyId: 'mYlOc4lK3y-dev',
    endpoint: 'localhost:8000'
  }),
  ...(isTest && {
    accessKeyId: 'mYlOc4lK3y-test',
    endpoint: 'localhost:5000'
  })
};
AWS.config.update(config);

const dynamoDbClient = new AWS.DynamoDB();
const documentClient = new AWS.DynamoDB.DocumentClient();

module.exports = {
  dynamoDbClient,
  documentClient
};
