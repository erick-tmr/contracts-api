'use strict';

const createContractCommand = require('../create-contract-command');

const fakeContractRepository = {
  create: (params) => Promise.resolve(params)
};
const fakeUserRepository = {
  find: () => Promise.resolve(true)
};

it('validates the contract attributes', async () => {
  const contractAttributes = {
    status: 'created',
    userId: 'my-uuid',
    approvalState: 'analyzing'
  };

  const { validations, success } = await createContractCommand(contractAttributes, fakeContractRepository, fakeUserRepository);
  expect(success).toBe(false);
  expect(validations).toEqual(
    expect.arrayContaining(['amount must be a Number, integer.'])
  );
});

describe('without errors', () => {
  it('returns success true', async () => {
    const contractAttributes = {
      amount: 5000000,
      userId: 'my-uuid',
      approvalState: 'analyzing'
    };

    const { success } = await createContractCommand(contractAttributes, fakeContractRepository, fakeUserRepository);
    expect(success).toBe(true);
  });

  it('returns the created contract in resource key', async () => {
    const contractAttributes = {
      amount: 5000000,
      userId: 'my-uuid',
      approvalState: 'analyzing'
    };

    const { resource } = await createContractCommand(contractAttributes, fakeContractRepository, fakeUserRepository);
    expect(resource).toMatchObject(contractAttributes);
  });
});
