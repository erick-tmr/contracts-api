'use strict';

module.exports = (attributes, validator, validatableFields, model) => {
  const validations = validatableFields.map(
    field => validator(field, attributes[field], model)
  );

  return validations.reduce((response, errors) => ([
    ...response,
    ...errors
  ]));
};
