
function setupUrlRoutes(router, urlStorageController, apiKeysController){
    try{
        router.post('/url', urlStorageController.createUrlStorage)
        router.get('/:indexUrl', urlStorageController.getUrlStorage)
        
        router.post('/apiKey', apiKeysController.createAPIKey)
    }catch(error){
        console.error('Error setting up routes:', error)
        throw new Error('Failed to initialize routes')
    }
}

export default setupUrlRoutes
