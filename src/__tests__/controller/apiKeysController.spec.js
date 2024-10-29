import { afterEach, beforeEach, expect, jest } from "@jest/globals"

import APIKeysController from "../../controller/apiKeysController"

describe("APIKeys Controller", () => {
	let response
	let next
	let apiKeysService

	let apiKeysController

	beforeEach(() => {
		console.error = jest.fn()

		response = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
			sendStatus: jest.fn(),
			setHeader: jest.fn().mockReturnThis()
		}
        
		next = jest.fn()

		apiKeysService = {
			createAPIKey: jest.fn(() => Promise.resolve({ key: "12345abcdf6789ghij" }))
		}

		apiKeysController = new APIKeysController(apiKeysService)
	})

	afterEach(() => {
		jest.clearAllMocks()
	})

	test("Should return 201 when creating new urlStorage", async () => {
		const request = {}

		await apiKeysController.createAPIKey(request, response, next)

		expect(apiKeysService.createAPIKey).toHaveBeenCalledTimes(1)
		expect(response.json).toHaveBeenCalledWith({ message: "APIKey:12345abcdf6789ghij" })
		expect(response.status).toHaveBeenCalledWith(201)
	})

	test("Should return 500 if an error occur while saving", async () => {
		const request = {}

		apiKeysService.createAPIKey = jest.fn().mockImplementationOnce(() => {throw new Error("Database Error")})

		await apiKeysController.createAPIKey(request, response, next)
        
		expect(apiKeysService.createAPIKey).toHaveBeenCalledTimes(1)
		expect(next).toHaveBeenCalledWith(new Error("Database Error"))
	})

})
