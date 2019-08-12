'use strict'

const baseRepository = require('./base-repository');
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
    console.log('###will create')
    return create({ item });
  }
};
