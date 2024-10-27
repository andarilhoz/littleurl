
function setupUrlRoutes(router, urlStorageController){
    try{
        router.post('/url', urlStorageController.createUrlStorage)
        router.get('/:indexUrl', urlStorageController.getUrlStorage)
    }catch(error){
        console.error('Error setting up routes:', error)
        throw new Error('Failed to initialize routes')
    }
}

export default setupUrlRoutes
