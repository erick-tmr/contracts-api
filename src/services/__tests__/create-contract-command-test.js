'use strict'

const createContractCommand = require('../create-contract-command');

const fakeRepository = {
  create: (params) => Promise.resolve(params)
};

it('validates the contract attributes', () => {
  const contractAttributes = {
    status: 'created',
    userId: 'my-uuid',
    approved: false
  };

  const { validations, success } = createContractCommand(contractAttributes, fakeRepository);
  expect(success).toBe(false);
  expect(validations).toEqual(
    expect.arrayContaining(['amount must be a Number, integer.'])
  );
})

describe('without errors', () => {
  it('returns success true', async () => {
    const contractAttributes = {
      amount: 5000000,
      userId: 'my-uuid',
      approved: false
    };

    const { success } = await createContractCommand(contractAttributes, fakeRepository);
    expect(success).toBe(true);
  })

  it('returns the created contract in resource key', async () => {
    const contractAttributes = {
      amount: 5000000,
      userId: 'my-uuid',
      approved: false
    };

    const { resource } = await createContractCommand(contractAttributes, fakeRepository);
    expect(resource).toMatchObject(contractAttributes);
  })
})
