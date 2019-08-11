'use strict'

const baseRepository = require('../base-repository');
const { dynamoClient: { documentClient } } = require('contracts-api-db');

describe('without a tableName', () => {
  it('raises an exception', () => {
    expect(() => {
      baseRepository()
    }).toThrow(new Error('tableName is required.'));
  })
})

it('returns an object with create method', () => {
  expect(baseRepository('test-tk_contracts_api')).toHaveProperty('create');
})

describe('.create', () => {
  it('raises an exception with an item without pk', () => {
    const { create } = baseRepository('test-tk_contracts_api');
    const item = {
      sk: 'sort-key'
    };

    expect(() => {
      create({ item });
    }).toThrow(new Error('Primary Key is required, provide a pk and a sk.'));
  })

  it('raises an exception with an item without sk', () => {
    const { create } = baseRepository('test-tk_contracts_api');
    const item = {
      pk: 'partition-key'
    };

    expect(() => {
      create({ item });
    }).toThrow(new Error('Primary Key is required, provide a pk and a sk.'));
  })

  it('creates an item at the provided table', async () => {
    const { create } = baseRepository('test-tk_contracts_api');
    const item = {
      pk: 'partition-key',
      sk: 'sort-key',
      name: 'My Item'
    };
    const docItem = {
      TableName: 'test-tk_contracts_api',
      Key: {
        pk: item.pk,
        sk: item.sk
      }
    };
    const getResponse = await documentClient.get(docItem).promise();

    if (getResponse.Item) {
      await documentClient.delete(docItem).promise();
    }

    await create({ item });
    const getCreatedResponse = await documentClient.get(docItem).promise();
    expect(getCreatedResponse.Item).toMatchObject(item);

    await documentClient.delete(docItem).promise();
  })

  it('raises an exception with a repeated primary key', async () => {
    const { create } = baseRepository('test-tk_contracts_api');
    const item = {
      pk: 'partition-key',
      sk: 'sort-key',
      name: 'My Item'
    };
    const docItem = {
      TableName: 'test-tk_contracts_api',
      Key: {
        pk: item.pk,
        sk: item.sk
      }
    };
    const getResponse = await documentClient.get(docItem).promise();

    if (!getResponse.Item) {
      await documentClient.put({
        TableName: 'test-tk_contracts_api',
        Item: item
      }).promise();
    }

    try {
      await create({ item });
    } catch (error) {
      expect(error.code).toMatch('ConditionalCheckFailedException');
    }

    await documentClient.delete(docItem).promise();
  })
})
