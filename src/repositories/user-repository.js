'use strict';

const baseRepository = require('./base-repository');
const userModelBuilder = require('../models/user-model');
const contractModelBuilder = require('../models/contract-model');
const withId = require('./with-id');

const tableName = 'tk_contracts_api';
const baseRepositoryInstance = baseRepository(tableName);

module.exports = {
  create: (userModel) => {
    const updatedModel = withId(userModel);
    const item = {
      pk: updatedModel.id,
      sk: 'User',
      data: updatedModel.email,
      filter: `${updatedModel.firstName}#${updatedModel.lastName}`,
      ...updatedModel
    };
    const { create } = baseRepositoryInstance;

    return create(item)
      .then(() => updatedModel);
  },
  find: (userId) => {
    const primaryKey = {
      pk: userId,
      sk: 'User'
    };
    const { get } = baseRepositoryInstance;

    return get(primaryKey)
      .then(({ Item }) => {
        if (!Item) {
          return;
        }
        
        return userModelBuilder(Item);
      });
  },
  update: (userModel) => {
    const item = {
      pk: userModel.id,
      sk: 'User',
      data: userModel.email,
      filter: `${userModel.firstName}#${userModel.lastName}`,
      ...userModel
    };
    const { update } = baseRepositoryInstance;

    return update(item);
  },
  list: () => {
    const conditionExpression = 'sk = :pk';
    const expressionValues = {
      ':pk': 'User'
    };
    const indexName = 'gsi_1';
    const { query } = baseRepositoryInstance;

    return query(conditionExpression, expressionValues, indexName)
      .then(({ Items, Count }) => {
        return {
          items: Items.map(attributes => userModelBuilder(attributes)),
          count: Count
        };
      });
  },
  contracts: (userId) => {
    const conditionExpression = 'sk = :pk AND #d = :sk';
    const expressionValues = {
      ':pk': 'Contract',
      ':sk': userId
    };
    const expressionNames = {
      '#d': 'data'
    };
    const indexName = 'gsi_1';
    const { query } = baseRepositoryInstance;

    return query(conditionExpression, expressionValues, indexName, expressionNames)
      .then(({ Items, Count }) => {
        return {
          items: Items.map(attributes => contractModelBuilder(attributes)),
          count: Count
        };
      });
  }
};
