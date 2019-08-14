'use strict'

const baseRepository = require('./base-repository');
const userModelBuilder = require('../models/user-model');
const uuidv4 = require('uuid/v4');

const tableName = 'tk_contracts_api';
const baseRepositoryInstance = baseRepository(tableName);

module.exports = {
  create: (userModel) => {
    const item = {
      pk: uuidv4(),
      sk: 'User',
      data: userModel.email,
      filter: `${userModel.firstName}#${userModel.lastName}`,
      ...userModel
    };
    const { create } = baseRepositoryInstance;

    return create(item);
  },
  find: (userId) => {
    const primaryKey = {
      pk: userId,
      sk: 'User'
    };
    const { get } = baseRepositoryInstance;

    return get(primaryKey)
      .then(({ Item }) => userModelBuilder(Item));
  },
  update: (userModel) => {
    const item = {
      pk: userModel.pk,
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
          items: Items.map(attributes => userModelBuilder(attributes)),
          count: Count
        };
      });
  }
};
