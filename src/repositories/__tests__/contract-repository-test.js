'use strict';

const contractRepository = require('../contract-repository');
const contractModel = require('../../models/contract-model');

jest.mock('../base-repository', () => () => ({
  create: params => params
}));

it('returns an object with create method', () => {
  expect(contractRepository).toHaveProperty('create');
});

describe('.create', () => {
  it('creates a contract', () => {
    const contractAttributes = {
      amount: 5000000,
      userId: 'some-uuid-v4'
    };
    const contract = contractModel(contractAttributes);
    
    const response = contractRepository.create(contract);
    expect(response).toMatchObject(contractAttributes);
  });

  it('generates a partition key', () => {
    const contractAttributes = {
      amount: 5000000,
      userId: 'some-uuid-v4'
    };
    const contract = contractModel(contractAttributes);
    
    const response = contractRepository.create(contract);
    expect(response.pk).toBeDefined();
  });
});
