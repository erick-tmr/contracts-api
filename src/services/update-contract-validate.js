'use strict';

const baseValidator = require('./base-validator');

module.exports = (attributes, model) => {
  const validatableFields = [
    'status',
    'approvalState',
    'amount'
  ];
  const validator = (fieldName, value, model) => {
    return {
      status: () => {
        const errors = [];
        const possibleValues = [
          'created',
          'receiving_documents',
          'reviewed'
        ];
  
        if (!value) {
          errors.push('status is required.');

          return errors;
        }

        if (possibleValues.indexOf(value) === -1) {
          errors.push("status must be one of 'created', 'receiving_documents', 'reviewed'.");

          return errors;
        }
  
        return errors;
      }
    }[fieldName]();
  };

  return baseValidator(attributes, validator, validatableFields, model);
};
