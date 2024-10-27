import {afterEach, beforeEach, expect, jest} from '@jest/globals'
import ReadUrlStorageService from '../../service/readUrl'
import { InternalServerError, NotFoundError } from '../../errors/customErrors'

describe("ReadUrlStorage Service", () => {
    let urlStorageSchema
    let readUrlStorageService

    beforeEach( () => {
        urlStorageSchema = {
            findUrlStorage: jest.fn()
        }

        readUrlStorageService = new ReadUrlStorageService(urlStorageSchema)
    })

    afterEach(() => {
        urlStorageSchema.findUrlStorage.mockClear()
    })
    
    test("Should return 201 when creating new urlStorage", async () => {
        urlStorageSchema.findUrlStorage.mockReturnValue(Promise.resolve({indexUrl: "Zh0", targetUrl: "http://google.com"}))
        
        const result = await readUrlStorageService.findUrlByIndex("Zh0")

        expect(urlStorageSchema.findUrlStorage).toHaveBeenCalledTimes(1)
        expect(urlStorageSchema.findUrlStorage).toHaveBeenCalledWith("Zh0")
        expect(result.indexUrl).toBe("Zh0")
        expect(result.targetUrl).toBe("http://google.com")
    })

    test("Should throw InternalServerError when Schema throws", async () => {
        urlStorageSchema.findUrlStorage.mockImplementationOnce(() => {throw new InternalServerError()})
        await expect(
            readUrlStorageService.findUrlByIndex("asd")
        ).rejects.toThrow(InternalServerError)
    })

    test("Should throw NotFoundError when result is null", async () => {
        urlStorageSchema.findUrlStorage.mockReturnValue(Promise.resolve(null))
        
        await expect(
            readUrlStorageService.findUrlByIndex("asd")
        ).rejects.toThrow(NotFoundError)
    })
})