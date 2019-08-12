'use strict'

const userModel = require('../models/user-model');
const userValidations = require('./create-user-attributes-validate');

module.exports = (attributes, repository) => {
  const validations = userValidations(attributes);
  const newUser = userModel(attributes);

  if (validations.length !== 0) {
    return {
      success: false,
      resource: newUser,
      validations
    };
  }

  return repository.create(newUser)
    .then(() => ({
      success: true,
      resource: newUser
    }));
};
