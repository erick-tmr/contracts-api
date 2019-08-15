'use strict';

const contractRepository = require('../contract-repository');
const contractModel = require('../../models/contract-model');

jest.mock('../base-repository', () => () => ({
  create: async (params) => params
}));

it('returns an object with create method', () => {
  expect(contractRepository).toHaveProperty('create');
});

describe('.create', () => {
  it('creates a contract', async () => {
    const contractAttributes = {
      amount: 5000000,
      userId: 'some-uuid-v4'
    };
    const contract = contractModel(contractAttributes);
    
    const response = await contractRepository.create(contract);
    expect(response).toMatchObject(contractAttributes);
  });

  it('generates an id', async () => {
    const contractAttributes = {
      amount: 5000000,
      userId: 'some-uuid-v4'
    };
    const contract = contractModel(contractAttributes);
    
    const response = await contractRepository.create(contract);
    expect(response.id).toBeDefined();
  });
});
