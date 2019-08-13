'use strict'

const Api = require('claudia-api-builder');
const api = new Api({ mergeVars: true });

api.get('/', () => 'Welcome to the Contracts API!');

const createUsersController = require('./src/controllers/create-users-controller');
api.post('/users', createUsersController);

const createContractsController = require('./src/controllers/create-contracts-controller');
api.post('/users/{userId}/contracts', createContractsController);

api.get('/contracts', (request) => {
  return [
    {
      id: '1',
      name: 'Contrato 1',
      value: '15000000'
    },
    {
      id: '1',
      name: 'Contrato 2',
      value: '5000000'
    }
  ];
});

module.exports = api;
