'use strict'

const creteUserCommand = require('../services/create-user-command');
const userRepository = require('../repositories/user-repository');

module.exports = (request) => {
  const { body } = request;
  const userBody = {
    firstName: body.firstName,
    lastLame: body.lastName,
    cpf: body.cpf,
    email: body.email,
    montlyIncome: body.montlyIncome,
    dateOfBirth: body.dateOfBirth,
    maritalStatus: body.maritalStatus,
    address: body.address
  };

  return creteUserCommand(userBody, userRepository);
};
