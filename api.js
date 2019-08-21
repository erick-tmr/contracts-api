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

const indexUsersController = require('./src/controllers/index-users-controller');
api.get('/users', indexUsersController);

const indexUserContractsController = require('./src/controllers/index-user-contracts-controller');
api.get('/users/{userId}/contracts', indexUserContractsController);

const indexContractDocumentsController = require('./src/controllers/index-contract-documents-controller');
api.get('/contracts/{contractId}/documents', indexContractDocumentsController);

module.exports = api;
