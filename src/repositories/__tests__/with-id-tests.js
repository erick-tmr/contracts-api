'use strict';

const withId = require('../with-id');

it('returns the model with an id generated', () => {
  const fakeModel = {
    field: 'value',
    anotherField: {
      another: 'Values'
    }
  };

  const response = withId(fakeModel);
  expect(response).toMatchObject(fakeModel);
  expect(response.id).toBeDefined();
});
