import { afterEach, beforeEach, expect, jest } from '@jest/globals'
import validateApiKey from '../../middlewares/validateApiKey'
import { UnauthorizedError } from '../../errors/customErrors'

describe('ValidateAPIKey', () => {
    let req
    let res
    let next
    let apiKeyService

    beforeEach(() => {
        req = {
            headers: {}
        }
        res = {}
        next = jest.fn()
        apiKeyService = {
            findAPIKeyByKey: jest.fn()
        }
    })

    test("Should return UnauthorizedError if API Key is missing", async () => {
        await validateApiKey(apiKeyService)(req, res, next)
        expect(next).toHaveBeenCalledWith(new UnauthorizedError('API Key is required'))
    })

    test("Should return UnauthorizedError if API Key is invalid", async () => {
        req.headers['x-api-key'] = 'invalid-api-key'
        apiKeyService.findAPIKeyByKey.mockResolvedValue({ key: 'valid-api-key' })
        await validateApiKey(apiKeyService)(req, res, next)
        expect(next).toHaveBeenCalledWith(new UnauthorizedError('Invalid API Key'))
    })

    test("Should call next if API Key is valid", async () => {
        req.headers['x-api-key'] = 'valid-api-key'
        apiKeyService.findAPIKeyByKey.mockResolvedValue({ key: 'valid-api-key' })
        await validateApiKey(apiKeyService)(req, res, next)
        expect(next).toHaveBeenCalledWith()
    })
})
