'use strict';

const createUserCommand = require('../create-user-command');

const fakeRepository = {
  create: (params) => Promise.resolve(params)
};

it('validates the user attributes', () => {
  const userAttributes = {
    firstName: 'Person',
    lastName: 'Name',
    cpf: '40706332633',
    montlyIncome: 1000000, 
  };

  const { validations, success } = createUserCommand(userAttributes, fakeRepository);
  expect(success).toBe(false);
  expect(validations).toEqual(
    expect.arrayContaining(['email is required.'])
  );
});

describe('without errors', () => {
  it('returns success true', async () => {
    const userAttributes = {
      firstName: 'Person',
      lastName: 'Name',
      cpf: '40706332633',
      email: 'my@email.com',
      montlyIncome: 1000000 
    };

    const { success } = await createUserCommand(userAttributes, fakeRepository);
    expect(success).toBe(true);
  });

  it('returns the created user in resource key', async () => {
    const userAttributes = {
      firstName: 'Person',
      lastName: 'Name',
      cpf: '40706332633',
      email: 'my@email.com',
      montlyIncome: 1000000 
    };

    const { resource } = await createUserCommand(userAttributes, fakeRepository);
    expect(resource).toMatchObject(userAttributes);
  });
});
