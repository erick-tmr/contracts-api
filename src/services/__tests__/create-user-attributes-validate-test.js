'use strict';

const createUserAttributesValidate = require('../create-user-attributes-validate');

const baseUserAttributes = {
  firstName: 'Person',
  lastName: 'Name',
  cpf: '40706332633',
  email: 'some@email.com',
  montlyIncome: 1000000, 
};

describe('user without firstName', () => {
  it('returns an error', () => {
    // eslint-disable-next-line no-unused-vars
    const { firstName, ...userAttributes } = baseUserAttributes;

    const validations = createUserAttributesValidate(userAttributes);
    expect(validations).toEqual(
      expect.arrayContaining(['firstName is required.'])
    );
  });
});

describe('user without lastName', () => {
  it('returns an error', () => {
    // eslint-disable-next-line no-unused-vars
    const { lastName, ...userAttributes } = baseUserAttributes;

    const validations = createUserAttributesValidate(userAttributes);
    expect(validations).toEqual(
      expect.arrayContaining(['lastName is required.'])
    );
  });
});

describe('user without email', () => {
  it('returns an error', () => {
    // eslint-disable-next-line no-unused-vars
    const { email, ...userAttributes } = baseUserAttributes;

    const validations = createUserAttributesValidate(userAttributes);
    expect(validations).toEqual(
      expect.arrayContaining(['email is required.'])
    );
  });
});

describe('user without cpf', () => {
  it('returns an error', () => {
    // eslint-disable-next-line no-unused-vars
    const { cpf, ...userAttributes } = baseUserAttributes;

    const validations = createUserAttributesValidate(userAttributes);
    expect(validations).toEqual(
      expect.arrayContaining(['cpf is required.'])
    );
  });
});

it('validates all fields at the same time', () => {
  const userAttributes = { montlyIncome: 1000000 };

  const validations = createUserAttributesValidate(userAttributes);
  expect(validations).toEqual(
    expect.arrayContaining([
      'cpf is required.',
      'email is required.',
      'lastName is required.',
      'firstName is required.'
    ])
  );
});

describe('with all fields correct', () => {
  it('does not return errors', () => {
    const validations = createUserAttributesValidate(baseUserAttributes);
    expect(validations).toHaveLength(0);
  });
});
