'use strict'

const baseRepository = require('./base-repository');
const contractModelBuilder = require('../models/contract-model');
const uuidv4 = require('uuid/v4');

const tableName = 'tk_contracts_api';
const baseRepositoryInstance = baseRepository(tableName);

module.exports = {
  create: (contractModel) => {
    const item = {
      pk: uuidv4(),
      sk: 'Contract',
      data: contractModel.userId,
      filter: contractModel.status,
      ...contractModel
    };
    const { create } = baseRepositoryInstance;

    return create(item);
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
      pk: contractModel.pk,
      sk: 'Contract',
      data: contractModel.userId,
      filter: contractModel.status,
      ...contractModel
    };
    const { update } = baseRepositoryInstance;

    return update(item);
  }
};
