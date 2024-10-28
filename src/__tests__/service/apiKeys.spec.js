import {afterEach, beforeEach, expect, jest} from '@jest/globals'
import APIKeyService from '../../service/apiKeys'
import { InternalServerError, UnauthorizedError } from '../../errors/customErrors'

describe("APIKeys Service", () => {
    let apiKeySchema
    let apiKeyService

    beforeEach( () => {
        apiKeySchema = {
            findAPIKey: jest.fn(),
            createAPIKey: jest.fn()
        }

        apiKeyService = new APIKeyService(apiKeySchema)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })
    
    test("Should return 201 when creating new urlStorage", async () => {
        apiKeySchema.findAPIKey.mockReturnValue(Promise.resolve({key: "abcd1234fgh5678"}))
        
        const result = await apiKeyService.findAPIKeyByKey("abcd1234fgh5678")

        expect(apiKeySchema.findAPIKey).toHaveBeenCalledTimes(1)
        expect(apiKeySchema.findAPIKey).toHaveBeenCalledWith("abcd1234fgh5678")
        expect(result.key).toBe("abcd1234fgh5678")
    })

    test("Should throw InternalServerError when Schema throws", async () => {
        apiKeySchema.findAPIKey.mockImplementationOnce(() => {throw new InternalServerError()})
        await expect(
            apiKeyService.findAPIKeyByKey("asd")
        ).rejects.toThrow(InternalServerError)
    })

    test("Should throw UnauthorizedError when result is null", async () => {
        apiKeySchema.findAPIKey.mockReturnValue(Promise.resolve(null))
        
        await expect(
            apiKeyService.findAPIKeyByKey("asd")
        ).rejects.toThrow(UnauthorizedError)
    })

    test("Should create and return the object when executed with success", async () => {
        
        apiKeySchema.createAPIKey.mockReturnValue(Promise.resolve({key: "abcd1234fgh5678"}))
        
        const result = await apiKeyService.createAPIKey()
        expect(apiKeySchema.createAPIKey).toHaveBeenCalledTimes(1)
        expect(result.key).toBe("abcd1234fgh5678")
    })

    test("Should throw InternalServerError when Schema throws", async () => {
        apiKeySchema.createAPIKey.mockImplementationOnce(() => {throw new InternalServerError()})

        await expect(
            apiKeyService.createAPIKey()
        ).rejects.toThrow(InternalServerError)
    })
    
})