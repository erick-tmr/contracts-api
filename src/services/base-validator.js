'use strict'

module.exports = (attributes, validator, validatableFields) => {
  const validations = validatableFields.map(
    field => validator(field, attributes[field])
  );

  return validations.reduce((response, errors) => ([
    ...response,
    ...errors
  ]));
};
