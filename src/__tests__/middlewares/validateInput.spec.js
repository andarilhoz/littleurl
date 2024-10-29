import { afterEach, beforeEach, expect, jest } from "@jest/globals"
import validateInput from "../../middlewares/validateInput"
import { BadRequestError } from "../../errors/customErrors"

describe("validateInput Middleware", () => {
	let req, res, next

	beforeEach(() => {
		req = {
			body: {}
		}
		res = {}
		next = jest.fn()
	})

	test("should return BadRequestError if targetUrl is missing", () => {
		validateInput(req, res, next)
		expect(next).toHaveBeenCalledWith(new BadRequestError("Field targetUrl is required"))
	})

	test("should return BadRequestError for invalid URL", () => {
		req.body.targetUrl = "invalid-url"

		validateInput(req, res, next)
		expect(next).toHaveBeenCalledWith(new BadRequestError("Invalid URL"))
	})

	test("should return BadRequestError if ttlSeconds is not a positive integer", () => {
		req.body.targetUrl = "https://example.com"
		req.body.ttlSeconds = -100

		validateInput(req, res, next)
		expect(next).toHaveBeenCalledWith(new BadRequestError("ttlSeconds must be a positive int"))
	})

	test("should sanitize and call next when targetUrl and ttlSeconds are valid", () => {
		req.body.targetUrl = "https://example.com"
		req.body.ttlSeconds = 3600

		validateInput(req, res, next)

		expect(req.body.targetUrl).toBe(req.body.targetUrl)
		expect(next).toHaveBeenCalled()
	})

	test("should call next when ttlSeconds is not provided and targetUrl is valid", () => {
		req.body.targetUrl = "https://example.com"

		validateInput(req, res, next)

		expect(req.body.targetUrl).toBe(req.body.targetUrl)
		expect(next).toHaveBeenCalled()
	})
})
