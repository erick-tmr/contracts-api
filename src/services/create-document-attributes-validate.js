'use strict';

const baseValidator = require('./base-validator');
const documentModel = require('../models/document-model');

module.exports = (attributes) => {
  const validatableFields = [
    'type'
  ];
  const validator = (fieldName, value) => {
    return {
      type: () => {
        const errors = [];

        if (documentModel.Types.indexOf(value) === -1) {
          errors.push(`type should be one of ${documentModel.Types}`);
        }

        return errors;
      }
    }[fieldName]();
  };

  return baseValidator(attributes, validator, validatableFields);
};
