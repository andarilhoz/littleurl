import setupUrlRoutes from '../../routes/urlRoutes.js'
import UrlStorageController from '../../controller/urlController.js'
import { expect, jest } from '@jest/globals';

describe('setupUrlRoutes', () => {
  let router
  let urlStorageController
  let apiKeyController
  let apiKeyService

  beforeEach(() => {
    console.error = jest.fn()
    router = {
       post: jest.fn(), 
       get: jest.fn() 
    };

    urlStorageController = {
      createUrlStorage: jest.fn(),
      getUrlStorage: jest.fn(),
    };

    apiKeyController = {
      createAPIKey: jest.fn()
    }
    
    apiKeyService = {
      findAPIKeyByKey: jest.fn()
    }

  });

  test('Should create routes with correct controller methods', () => {
    setupUrlRoutes(router, urlStorageController, apiKeyController, apiKeyService);
    expect(router.post).toHaveBeenCalledWith('/url', expect.any(Function), urlStorageController.createUrlStorage);
    expect(router.get).toHaveBeenCalledWith('/:indexUrl', urlStorageController.getUrlStorage);
    
    expect(router.post).toHaveBeenCalledWith('/apiKey', apiKeyController.createAPIKey);
  });

  test('Should throw an error if route setup fails', () => {
    router.post = jest.fn(() => { throw new Error('Route setup error'); });
    expect(() => setupUrlRoutes(router, urlStorageController)).toThrow('Failed to initialize routes');
  });
});