import express from 'express'

import UrlStorageController from '../controller/urlController.js'
import WriteUrlStorageService from "../service/writeUrl.js"
import ReadUrlStorageService from "../service/readUrl.js"
import UrlStorageSchema from '../model/urlStorage.js'

const router = express.Router()

async function setupUrlRoutes(mongoose){
    try{
        const urlStorageSchema = new UrlStorageSchema(mongoose)
        const writeUrlStorageService = new WriteUrlStorageService(urlStorageSchema)
        const readUrlStorageService = new ReadUrlStorageService(urlStorageSchema)

        const urlStorageController = new UrlStorageController(writeUrlStorageService, readUrlStorageService)

        router.post('/url', urlStorageController.createUrlStorage)
        router.get('/:indexUrl', urlStorageController.getUrlStorage)
    }catch(error){
        console.error('Error setting up routes:', error)
        throw new Error('Failed to initialize routes')
    }
}

export { setupUrlRoutes, router }
