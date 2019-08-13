'use strict'

const baseRepository = require('./base-repository');
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

    return create({ item });
  }
};
