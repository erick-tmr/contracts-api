'use strict'

const baseValidator = require('./base-validator');

module.exports = (attributes) => {
  const validatableFields = [
    'status',
    'userId',
    'approved',
    'amount'
  ];
  const validator = (fieldName, value) => {
    return {
      status: () => {
        const errors = [];
        const possibleValues = [
          'created',
          'receiving_documents',
          'reviewed'
        ];

        if (value && possibleValues.indexOf(value) === -1) {
          errors.push("status must be one of 'created', 'receiving_documents', 'reviewed'.")
        }
  
        if (value && (value !== 'created')) {
          errors.push('status must be created.');
        }
  
        return errors;
      },
      userId: () => {
        const errors = [];
  
        if (!value) {
          errors.push('userId is required.');
        }
  
        return errors;
      },
      approved: () => {
        const errors = [];
  
        if (value && value !== false) {
          errors.push('approved must be false.');
        }
  
        return errors;
      },
      amount: () => {
        const errors = [];

        if (!value) {
          errors.push('amount is required.');
        }

        if (Number(value) !== value || value % 1 !== 0) {
          errors.push('amount must be a Number, integer.');
        }

        return errors;
      }
    }[fieldName]();
  };

  return baseValidator(attributes, validator, validatableFields);
};
