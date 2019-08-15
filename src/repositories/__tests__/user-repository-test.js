'use strict';

const userRepository = require('../user-repository');
const userModel = require('../../models/user-model');

jest.mock('../base-repository', () => () => ({
  create: async (params) => params
}));

it('returns an object with create method', () => {
  expect(userRepository).toHaveProperty('create');
});

describe('.create', () => {
  it('creates an user', async () => {
    const userAttributes = {
      firstName: 'My',
      lastName: 'User',
      email: 'user@email.com'
    };
    const user = userModel(userAttributes);
    
    const response = await userRepository.create(user);
    expect(response).toMatchObject(userAttributes);
  });

  it('generates an id', async () => {
    const userAttributes = {
      firstName: 'My',
      lastName: 'User',
      email: 'user@email.com'
    };
    const user = userModel(userAttributes);
    
    const response = await userRepository.create(user);
    expect(response.id).toBeDefined();
  });
});
