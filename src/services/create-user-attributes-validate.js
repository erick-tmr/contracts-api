'use strict';

const baseValidator = require('./base-validator');

module.exports = (attributes) => {
  const validatableFields = [
    'firstName',
    'lastName',
    'email',
    'cpf'
  ];
  const validator = (fieldName, value) => {
    return {
      firstName: () => {
        const errors = [];
  
        if (!value) {
          errors.push('firstName is required.');
        }
  
        return errors;
      },
      lastName: () => {
        const errors = [];
  
        if (!value) {
          errors.push('lastName is required.');
        }
  
        return errors;
      },
      email: () => {
        const errors = [];
  
        if (!value) {
          errors.push('email is required.');
        }
  
        return errors;
      },
      cpf: () => {
        const errors = [];
  
        if (!value) {
          errors.push('cpf is required.');
        }
  
        return errors;
      }
    }[fieldName]();
  };

  return baseValidator(attributes, validator, validatableFields);
};
