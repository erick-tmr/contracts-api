'use strict'

const { dynamoClient: { documentClient } } = require('contracts-api-db');

module.exports = (tableName) => {
  if (!tableName) {
    throw 'tableName is required.';
  }

  return {
    create: ({ item }) => {
      if (!item.pk || !item.sk) {
        throw 'Primary Key is required, provide a pk and a sk.'
      }

      const putParams = {
        TableName: tableName,
        Item: item,
        ConditionExpression: 'attribute_not_exists(pk)'
      };

      return documentClient.put(putParams).promise();
    }
  };
};
