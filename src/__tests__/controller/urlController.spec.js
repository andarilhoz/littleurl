import {afterEach, beforeEach, expect, jest} from '@jest/globals'

import UrlStorageController from "../../controller/urlController"
import { NotFoundError } from '../../errors/customErrors'

describe("UrlStorage Controller", () => {
    let response
    let next
    let writeUrlStorageService
    let readUrlStorageService

    let urlStorageController

    beforeEach(() => {
        console.error = jest.fn()

        response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            sendStatus: jest.fn(),
            setHeader: jest.fn().mockReturnThis()
        }
        
        next = jest.fn();

        writeUrlStorageService = {
            createUrlStorage: jest.fn(() => Promise.resolve({indexUrl: "0Zh"}))
        }

        readUrlStorageService = {
            findUrlByIndex: jest.fn()
        }

        urlStorageController = new UrlStorageController(writeUrlStorageService, readUrlStorageService)
    })

    afterEach(() => {
        response.status.mockClear()
        response.json.mockClear()
        response.sendStatus.mockClear()
        response.setHeader.mockClear()
        next.mockClear()
        readUrlStorageService.findUrlByIndex.mockClear()
    })

    test("Should return 201 when creating new urlStorage", async () => {
        const request = {
            body: {
                targetUrl: "http://google.com"
            },
            protocol: "http",
            
            get: jest.fn(() => "localhost:3000")
        }

        

        await urlStorageController.createUrlStorage(request, response, next)

        expect(writeUrlStorageService.createUrlStorage).toHaveBeenCalledTimes(1)
        expect(writeUrlStorageService.createUrlStorage).toHaveBeenCalledWith("http://google.com")
        expect(response.json).toHaveBeenCalledWith({message: "http://localhost:3000/0Zh"})
        expect(response.status).toHaveBeenCalledWith(201)
    })

    test("Should return 500 if an error occur while saving", async () => {
        const request = {
            body: {
                targetUrl: "http://google.com"
            }
        }

        writeUrlStorageService.createUrlStorage = jest.fn().mockImplementationOnce(() => {throw new Error('Database Error')})

        await urlStorageController.createUrlStorage(request, response, next)
        
        expect(writeUrlStorageService.createUrlStorage).toHaveBeenCalledTimes(1)
        expect(writeUrlStorageService.createUrlStorage).toHaveBeenCalledWith("http://google.com")
        expect(next).toHaveBeenCalledWith(new Error('Database Error'))
    })


    test("Should return 404 if url form db is null", async () => {
        const request = {
            params: {
                indexUrl: "0zh"
            }
        }

        readUrlStorageService.findUrlByIndex = jest.fn().mockImplementationOnce(() => {throw new NotFoundError()})

        await urlStorageController.getUrlStorage(request, response, next)
        
        expect(readUrlStorageService.findUrlByIndex).toHaveBeenCalledTimes(1)
        expect(readUrlStorageService.findUrlByIndex).toHaveBeenCalledWith("0zh")
        expect(next).toHaveBeenCalledWith(new NotFoundError())
    })

    test("Should return 307 with Location header if url from db is found", async () => {
        const request = {
            params: {
                indexUrl: "0zh"
            }
        }

        readUrlStorageService.findUrlByIndex = jest.fn().mockImplementationOnce(() => Promise.resolve({targetUrl: "http://google.com"}))

        await urlStorageController.getUrlStorage(request, response)
        
        expect(readUrlStorageService.findUrlByIndex).toHaveBeenCalledTimes(1)
        expect(readUrlStorageService.findUrlByIndex).toHaveBeenCalledWith("0zh")
        expect(response.setHeader).toHaveBeenCalledWith('Location', 'http://google.com')
        expect(response.sendStatus).toHaveBeenCalledWith(307)
    })

    test("Should return 500 if an error occur while finding from db", async () => {
        const request = {
            params: {
                indexUrl: "0zh"
            }
        }

        readUrlStorageService.findUrlByIndex = jest.fn().mockImplementationOnce(() => {throw new Error('Database Error')})

        await urlStorageController.getUrlStorage(request, response, next)
        
        expect(readUrlStorageService.findUrlByIndex).toHaveBeenCalledTimes(1)
        expect(readUrlStorageService.findUrlByIndex).toHaveBeenCalledWith("0zh")
        expect(next).toHaveBeenCalledWith(new Error('Database Error'))
    })
    

})