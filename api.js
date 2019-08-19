'use strict';

const Api = require('claudia-api-builder');
const api = new Api({ mergeVars: true });

api.get('/', () => 'Welcome to the Contracts API!');

const createUsersController = require('./src/controllers/create-users-controller');
api.post('/users', createUsersController);

const createContractsController = require('./src/controllers/create-contracts-controller');
api.post('/users/{userId}/contracts', createContractsController);

const createDocumentsController = require('./src/controllers/create-documents-controller');
api.post('/contracts/{contractId}/documents', createDocumentsController);

// const updateUsersController = require('./src/controllers/update-users-controller');
// api.put('/users/{userId}', updateUsersController);

// const updateContractsController = require('./src/controllers/update-contracts-controller');
// api.put('/contracts/{contractId}', updateContractsController);

module.exports = api;
