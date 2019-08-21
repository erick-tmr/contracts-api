'use strict';

const baseValidator = require('./base-validator');
const contractModel = require('../models/contract-model');

module.exports = (attributes, contract) => {
  const validatableFields = [
    'approvalState',
    'amount'
  ];
  const validator = (fieldName, value, model) => {
    return {
      approvalState: () => {
        const errors = [];
  
        if (value && contractModel.ApprovalStates.indexOf(value) === -1) {
          errors.push(`approvalState should be one of ${contractModel.ApprovalStates}`);
        }

        if (value && model.status !== 'to_be_approved') {
          errors.push("contract must be in 'to_be_approved' to update approvalState");
        }
  
        return errors;
      },
      amount: () => {
        const errors = [];

        if (value && (Number(value) !== value || value % 1 !== 0)) {
          errors.push('amount must be a Number, integer.');
        }

        if (value && model.status === 'analyzed') {
          errors.push('contract must not be analyzed to update amount');
        }

        return errors;
      }
    }[fieldName]();
  };

  return baseValidator(attributes, validator, validatableFields, contract);
};
