'use strict';

const uuidv4 = require('uuid/v4');

module.exports = (model) => {
  const id = uuidv4();
  const updatedModel = {
    ...model,
    id
  };

  return updatedModel;
};
