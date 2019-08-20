'use strict';

const createDocumentCommand = require('../create-document-command');
const documentModel = require('../../models/document-model');

const fakeDocumentRepository = {
  create: (params) => Promise.resolve(params)
};
const fakeContractRepository = {
  find: () => Promise.resolve({
    status: 'receiving_documents'
  }),
  update: () => Promise.resolve(true)
};

it('validates the document attributes', async () => {
  const documentAttributes = {
    type: 'cpf-invalid'
  };

  const { validations, success } = await createDocumentCommand(documentAttributes, fakeDocumentRepository, fakeContractRepository);
  expect(success).toBe(false);
  expect(validations).toEqual(
    expect.arrayContaining([`type should be one of ${documentModel.Types}`])
  );
});

describe('without errors', () => {
  it('returns success true', async () => {
    const documentAttributes = {
      type: 'cpf',
      contractId: 'my-uuid',
      publicUrl: 'myphoto.com/photo.jpg'
    };

    const { success } = await createDocumentCommand(documentAttributes, fakeDocumentRepository, fakeContractRepository);
    expect(success).toBe(true);
  });

  it('returns the created document in resource key', async () => {
    const documentAttributes = {
      type: 'cpf',
      contractId: 'my-uuid',
      publicUrl: 'myphoto.com/photo.jpg'
    };

    const { resource } = await createDocumentCommand(documentAttributes, fakeDocumentRepository, fakeContractRepository);
    expect(resource).toMatchObject(documentAttributes);
  });
});

describe('with contract inexistent', () => {
  const fakeContractRepository = {
    find: () => Promise.resolve(false)
  };

  it('returns an error', async () => {
    const documentAttributes = {
      type: 'cpf',
      contractId: 'my-uuid',
      publicUrl: 'myphoto.com/photo.jpg'
    };
  
    const { validations, success } = await createDocumentCommand(documentAttributes, fakeDocumentRepository, fakeContractRepository);
    expect(success).toBe(false);
    expect(validations).toEqual(
      expect.arrayContaining(['contract with contractId not found.'])
    );
  });

  it('returns success false', async () => {
    const documentAttributes = {
      type: 'cpf',
      contractId: 'my-uuid',
      publicUrl: 'myphoto.com/photo.jpg'
    };

    const { success } = await createDocumentCommand(documentAttributes, fakeDocumentRepository, fakeContractRepository);
    expect(success).toBe(false);
  });
});

describe('with not in status receiving_documents', () => {
  const fakeContractRepository = {
    find: () => Promise.resolve({
      status: 'created'
    }),
    update: () => Promise.resolve(true)
  };

  it('returns an error', async () => {
    const documentAttributes = {
      type: 'cpf',
      contractId: 'my-uuid',
      publicUrl: 'myphoto.com/photo.jpg'
    };
  
    const { validations, success } = await createDocumentCommand(documentAttributes, fakeDocumentRepository, fakeContractRepository);
    expect(success).toBe(false);
    expect(validations).toEqual(
      expect.arrayContaining(["contract must be in 'receiving_documents' to accept documents."])
    );
  });

  it('returns success false', async () => {
    const documentAttributes = {
      type: 'cpf',
      contractId: 'my-uuid',
      publicUrl: 'myphoto.com/photo.jpg'
    };

    const { success } = await createDocumentCommand(documentAttributes, fakeDocumentRepository, fakeContractRepository);
    expect(success).toBe(false);
  });
});

describe('with document of type cpf or cnh', () => {
  it('returns success true', async () => {
    const documentAttributes = {
      type: 'cpf',
      contractId: 'my-uuid',
      publicUrl: 'myphoto.com/photo.jpg'
    };

    const { success } = await createDocumentCommand(documentAttributes, fakeDocumentRepository, fakeContractRepository);
    expect(success).toBe(true);
  });

  it('changes the contract status to to_be_approved', async () => {
    const mockedUpdate = jest.fn(() => Promise.resolve(true));
    const mockedContract = {
      status: 'receiving_documents'
    };
    const documentAttributes = {
      type: 'cpf',
      contractId: 'my-uuid',
      publicUrl: 'myphoto.com/photo.jpg'
    };
    const fakeContractRepository = {
      find: () => Promise.resolve(mockedContract),
      update: mockedUpdate
    };

    await createDocumentCommand(documentAttributes, fakeDocumentRepository, fakeContractRepository);
    expect(mockedUpdate).toHaveBeenCalledWith(mockedContract);
  });
});
