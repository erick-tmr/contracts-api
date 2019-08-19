'use strict';

const baseRepository = require('./base-repository');
const withId = require('./with-id');

const tableName = 'tk_contracts_api';
const baseRepositoryInstance = baseRepository(tableName);

module.exports = {
  create: (documentModel) => {
    const updatedModel = withId(documentModel);
    const item = {
      pk: updatedModel.id,
      sk: updatedModel.contractId,
      data: updatedModel.type,
      ...updatedModel
    };
    const { create } = baseRepositoryInstance;

    return create(item)
      .then(() => updatedModel);
  }
};
