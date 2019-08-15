'use strict';

const baseValidator = require('./base-validator');

module.exports = (attributes) => {
  const validatableFields = [
    'userId',
    'approvalState',
    'amount'
  ];
  const validator = (fieldName, value) => {
    return {
      userId: () => {
        const errors = [];
  
        if (!value) {
          errors.push('userId is required.');
        }
  
        return errors;
      },
      approvalState: () => {
        const errors = [];
  
        if (value && value !== 'analyzing') {
          errors.push('approvalState must be analyzing.');
        }
  
        return errors;
      },
      amount: () => {
        const errors = [];

        if (value && (Number(value) !== value || value % 1 !== 0)) {
          errors.push('amount must be a Number, integer.');
        }

        return errors;
      }
    }[fieldName]();
  };

  return baseValidator(attributes, validator, validatableFields);
};
