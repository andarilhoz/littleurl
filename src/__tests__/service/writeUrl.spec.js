import {afterEach, beforeEach, expect, jest} from '@jest/globals'

import { InternalServerError, NotFoundError } from '../../errors/customErrors'


const nanoidMock = {
    customAlphabet: jest.fn(),
}


jest.unstable_mockModule('nanoid', () => nanoidMock);

const { default: WriteUrlStorageService } = await import('../../service/writeUrl');
const { customAlphabet } = await import('nanoid');

describe("WriteUrlStorage Service", () => {
    let urlStorageSchema
    let writeUrlStorageService

    beforeEach(() => {
        console.warn = jest.fn()
        urlStorageSchema = {
            createUrlStorage: jest.fn()
        }

        customAlphabet.mockReturnValue(() => 'Zh0');
        writeUrlStorageService = new WriteUrlStorageService(urlStorageSchema)
    })

    afterEach(() => {
        urlStorageSchema.createUrlStorage.mockClear()
        customAlphabet.mockClear();
    })

    test("Should call customAlphabet with correct parameters on initialization", () => {
        expect(customAlphabet).toHaveBeenCalledWith('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 3);
      });

    test("Should create and return the object when executed with success", async () => {
        
        urlStorageSchema.createUrlStorage.mockReturnValue(Promise.resolve({indexUrl: "Zh0", targetUrl: "http://google.com"}))
        
        const result = await writeUrlStorageService.createUrlStorage("http://google.com")
        expect(urlStorageSchema.createUrlStorage).toHaveBeenCalledTimes(1)
        expect(result.targetUrl).toBe("http://google.com")
        expect(result.indexUrl).toBe("Zh0")
    })

    test("Should throw InternalServerError when Schema throws", async () => {
        urlStorageSchema.createUrlStorage.mockImplementationOnce(() => {throw new InternalServerError()})

        await expect(
            writeUrlStorageService.createUrlStorage("http://google.com")
        ).rejects.toThrow(InternalServerError)
    })

    test("Should retry saving with another indexUrl in case of duplicate error", async () => {
        const duplicateError = {
            code: 11000,
            keyValue: {
                indexUrl: "Zh0"
            }
        }
        
        urlStorageSchema.createUrlStorage
            .mockImplementationOnce(() => {throw duplicateError })
            .mockImplementationOnce(() => {throw duplicateError })
            .mockImplementationOnce(() => {throw duplicateError })
            .mockImplementationOnce(() => Promise.resolve({indexUrl: "Zh0", targetUrl: "http://google.com"}))

        urlStorageSchema.createUrlStorage.mockReturnValue(Promise.resolve({indexUrl: "Zh0", targetUrl: "http://google.com"}))
        
        const result = await writeUrlStorageService.createUrlStorage("http://google.com")

        expect(urlStorageSchema.createUrlStorage).toHaveBeenCalledTimes(4)

        expect(customAlphabet).toHaveBeenCalledWith('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 4);
        expect(result.targetUrl).toBe("http://google.com")
        expect(result.indexUrl).toBe("Zh0")
    })

    test("Calculate expiration should return null if parameter is undefined", () => {
        const result = writeUrlStorageService.calculateExpiration(undefined)
        expect(result).toBe(null)
    })
    
    test("Calculate expiration should return new Date based on seconds parameter", () => {
        jest.useFakeTimers()
        const fakeDate = new Date(2024, 3, 30, 12, 0, 0)
        jest.setSystemTime(fakeDate)

        const result = writeUrlStorageService.calculateExpiration(3600)
        expect(result).toEqual(new Date(2024, 3, 30, 13, 0, 0))
    })
})