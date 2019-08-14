'use strict'

const { dynamoClient: { documentClient } } = require('contracts-api-db');

module.exports = (tableName) => {
  if (!tableName) {
    throw 'tableName is required.';
  }

  return {
    create: (item) => {
      if (!item.pk || !item.sk) {
        throw 'Primary Key is required, provide a pk and a sk.';
      }

      const putParams = {
        TableName: tableName,
        Item: item,
        ConditionExpression: 'attribute_not_exists(pk)'
      };

      return documentClient.put(putParams).promise();
    },
    get: (primaryKey) => {
      if (!primaryKey.pk || !primaryKey.sk) {
        throw 'Primary Key is required, provide a pk and a sk.';
      }

      const getParams = {
        TableName: tableName,
        Key: {
          pk: primaryKey.pk,
          sk: primaryKey.sk
        }
      };

      return documentClient.get(getParams).promise();
    },
    query: (conditionExpression, expressionValues, indexName, expressionNames) => {
      if (!conditionExpression || !expressionValues) {
        throw 'Expression to query is required.';
      }

      const queryParams = {
        TableName: tableName,
        KeyConditionExpression: conditionExpression,
        ExpressionAttributeValues: expressionValues
      };

      if (indexName) {
        queryParams['IndexName'] = indexName;
      }

      if (expressionNames) {
        queryParams['ExpressionAttributeNames'] = expressionNames;
      }

      return documentClient.query(queryParams).promise();
    },
    update: (item) => {
      if (!item.pk || !item.sk) {
        throw 'Primary Key is required, provide a pk and a sk.';
      }

      const putParams = {
        TableName: tableName,
        Item: item
      };

      return documentClient.put(putParams).promise();
    }
  };
};
