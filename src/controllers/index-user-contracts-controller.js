'use strict';

const getUserContractsCommand = require('../services/get-user-contracts-command');
const userRepository = require('../repositories/user-repository');

module.exports = (request) => {
  const { pathParams } = request;
  const userId = pathParams.userId;

  return getUserContractsCommand(userId, userRepository);
};
