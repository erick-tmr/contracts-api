'use strict';

const contractModel = require('../models/contract-model');
const contractValidations = require('./create-contract-attributes-validate');

const userNonExistent = async (userId, userRepository) => {
  const user = await userRepository.find(userId);

  return !user;
};

module.exports = async (attributes, contractRepository, userRepository) => {
  const validations = contractValidations(attributes);
  const newContract = contractModel(attributes);

  if (await userNonExistent(newContract.userId, userRepository)) {
    validations.push('user with userId not found.');
  }

  if (validations.length !== 0) {
    return {
      success: false,
      resource: newContract,
      validations
    };
  }

  return contractRepository.create(newContract)
    .then(() => ({
      success: true,
      resource: newContract
    }))
    .catch((error) => {
      console.log('error', error);
      throw error;
    });
};
