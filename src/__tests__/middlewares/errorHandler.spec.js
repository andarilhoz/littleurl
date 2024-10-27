import {afterEach, beforeEach, expect, jest} from '@jest/globals'
import errorHandler from '../../middlewares/errorHandler'
import { NotFoundError, InternalServerError } from '../../errors/customErrors'
import { response } from 'express'

describe("ErrorHandler", () => {
    let response

    beforeEach(() => {
        console.error = jest.fn()
        response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            sendStatus: jest.fn(),
            setHeader: jest.fn().mockReturnThis()
        }
    })

    test("Should return NotFoundError status code and message", () => {
        const notFoundError = new NotFoundError()

        errorHandler(notFoundError, null, response, null)

        expect(response.status).toHaveBeenCalledWith(notFoundError.statusCode)
        expect(response.json).toHaveBeenCalledWith({message: notFoundError.message})
    })

    test("Should return InternalServerError status code and message", () => {
        const internalServerError = new InternalServerError()

        errorHandler(internalServerError, null, response, null)

        expect(response.status).toHaveBeenCalledWith(internalServerError.statusCode)
        expect(response.json).toHaveBeenCalledWith({message: internalServerError.message})
    })

    test("Should return UnexpectedError in case of a different error", () => {
        const defaultError = new Error("Default Error")

        errorHandler(defaultError, null, response, null)

        expect(response.status).toHaveBeenCalledWith(500)
        expect(console.error).toBeCalledWith(`Unexpected Error stack: ${defaultError.stack}`, defaultError)
        expect(response.json).toHaveBeenCalledWith({message: "Unexpected Error", error: defaultError})
    })
})