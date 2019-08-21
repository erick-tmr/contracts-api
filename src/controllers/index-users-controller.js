'use strict';

const getUsersCommand = require('../services/get-users-command');
const userRepository = require('../repositories/user-repository');

module.exports = () => {
  return getUsersCommand(userRepository);
};
