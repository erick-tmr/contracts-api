'use strict'

const contractModel = require('../models/contract-model');
const contractValidations = require('./create-contract-attributes-validate');

module.exports = (attributes, repository) => {
  const validations = contractValidations(attributes);
  const newContract = contractModel(attributes);

  if (validations.length !== 0) {
    return {
      success: false,
      resource: newContract,
      validations
    };
  }

  return repository.create(newContract)
    .then(() => ({
      success: true,
      resource: newContract
    }))
    .catch((error) => {
      console.log('error', error);
      throw error;
    });
}
