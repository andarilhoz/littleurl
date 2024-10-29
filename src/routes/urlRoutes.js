import validateApiKey from "../middlewares/validateApiKey.js"
import validateInput from "../middlewares/validateInput.js"

function setupUrlRoutes(router, urlStorageController, apiKeysController, apiKeyService) {
	try{
		router.post("/url", validateApiKey(apiKeyService), validateInput, urlStorageController.createUrlStorage)
		router.get("/:indexUrl", urlStorageController.getUrlStorage)
        
		router.post("/apiKey", apiKeysController.createAPIKey)
	}catch(error) {
		console.error("Error setting up routes:", error)
		throw new Error("Failed to initialize routes")
	}
}

export default setupUrlRoutes
