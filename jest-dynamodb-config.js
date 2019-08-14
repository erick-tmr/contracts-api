'use strict';

module.exports = {
  tables: [
    {
      AttributeDefinitions: [
        {
          AttributeName: "pk", 
          AttributeType: "S"
        }, 
        {
          AttributeName: "sk", 
          AttributeType: "S"
        },
        {
          AttributeName: "data", 
          AttributeType: "S"
        },
        {
          AttributeName: "filter", 
          AttributeType: "S"
        },
      ],
      KeySchema: [
        {
          AttributeName: "pk", 
          KeyType: "HASH"
        }, 
        {
          AttributeName: "sk", 
          KeyType: "RANGE"
        }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1, 
        WriteCapacityUnits: 1
      },
      TableName: 'test-tk_contracts_api',
      GlobalSecondaryIndexes: [
        {
          IndexName: 'gsi_1',
          KeySchema: [
            {
              AttributeName: 'sk',
              KeyType: 'HASH'
            },
            {
              AttributeName: 'data',
              KeyType: 'RANGE'
            }
          ],
          Projection: {
            ProjectionType: 'ALL'
          },
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          }
        },
        {
          IndexName: 'gsi_2',
          KeySchema: [
            {
              AttributeName: 'data',
              KeyType: 'HASH'
            },
            {
              AttributeName: 'filter',
              KeyType: 'RANGE'
            }
          ],
          Projection: {
            ProjectionType: 'ALL'
          },
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          }
        },
        {
          IndexName: 'gsi_3',
          KeySchema: [
            {
              AttributeName: 'sk',
              KeyType: 'HASH'
            },
            {
              AttributeName: 'filter',
              KeyType: 'RANGE'
            }
          ],
          Projection: {
            ProjectionType: 'ALL'
          },
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          }
        }
      ]
    }
    // etc
  ],
  port: 5000
};
