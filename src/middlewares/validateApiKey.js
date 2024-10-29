import { UnauthorizedError } from "../errors/customErrors.js"

const validateApiKey = (apiKeyService) => {
	return async (req, res, next) => {
		const apiKey = req.headers["x-api-key"]

		if(!apiKey) {
			return next(new UnauthorizedError("API Key is required"))
		}

		const apiKeySaved = await apiKeyService.findAPIKeyByKey(apiKey)

		if(apiKeySaved.key !== apiKey) {
			return next(new UnauthorizedError("Invalid API Key"))
		}

		next()
	}
}

export default validateApiKey
