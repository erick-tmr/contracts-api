'use strict';

const contractModel = require('../models/contract-model');
const contractValidations = require('./create-contract-attributes-validate');

const setContractStatus = (model) => {
  if (model.amount > 0) {
    return {
      ...model,
      status: 'receiving_documents'
    };
  }

  return model;
};

module.exports = async (attributes, contractRepository, userRepository) => {
  const validations = contractValidations(attributes);
  const newContract = contractModel(attributes);
  const contractUser = await userRepository.find(newContract.userId);

  if (!contractUser) {
    validations.push('user with userId not found.');
  }

  if (validations.length !== 0) {
    return {
      success: false,
      resource: newContract,
      validations
    };
  }

  newContract.userSnapshot = contractUser;
  const newContractUpdated = setContractStatus(newContract);

  return contractRepository.create(newContractUpdated)
    .then((updatedModel) => ({
      success: true,
      resource: updatedModel
    }))
    .catch((error) => {
      console.log('error', error);
      throw error;
    });
};
