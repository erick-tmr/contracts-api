'use strict';

const baseRepository = require('./base-repository');
const contractModelBuilder = require('../models/contract-model');
const documentModelBuilder = require('../models/document-model');
const withId = require('./with-id');

const tableName = 'tk_contracts_api';
const baseRepositoryInstance = baseRepository(tableName);

module.exports = {
  create: (contractModel) => {
    const updatedModel = withId(contractModel);
    const item = {
      pk: updatedModel.id,
      sk: 'Contract',
      data: updatedModel.userId,
      filter: updatedModel.status,
      ...updatedModel
    };
    const { create } = baseRepositoryInstance;

    return create(item)
      .then(() => updatedModel);
  },
  find: (contractId) => {
    const primaryKey = {
      pk: contractId,
      sk: 'Contract'
    };
    const { get } = baseRepositoryInstance;

    return get(primaryKey)
      .then(({ Item }) => {
        if (!Item) {
          return;
        }
        
        return contractModelBuilder(Item);
      });
  },
  list: () => {
    const conditionExpression = 'sk = :pk';
    const expressionValues = {
      ':pk': 'Contract'
    };
    const indexName = 'gsi_1';
    const { query } = baseRepositoryInstance;

    return query(conditionExpression, expressionValues, indexName)
      .then(({ Items, Count }) => {
        return {
          items: Items.map(attributes => contractModelBuilder(attributes)),
          count: Count
        };
      });
  },
  update: (contractModel) => {
    const item = {
      pk: contractModel.id,
      sk: 'Contract',
      data: contractModel.userId,
      filter: contractModel.status,
      ...contractModel
    };
    const { update } = baseRepositoryInstance;

    return update(item);
  },
  documents: (contractId) => {
    const conditionExpression = 'sk = :pk';
    const expressionValues = {
      ':pk': contractId
    };
    const indexName = 'gsi_1';
    const { query } = baseRepositoryInstance;

    return query(conditionExpression, expressionValues, indexName)
      .then(({ Items, Count }) => {
        return {
          items: Items.map(attributes => documentModelBuilder(attributes)),
          count: Count
        };
      });
  }
};
