import express from 'express'
import mongoose from 'mongoose'

import dotenv from 'dotenv'

dotenv.config()

console.log('string'+process.env.MONGODB_URL_STRING)

import setupUrlRoutes from './routes/urlRoutes.js'
import errorHandler from './middlewares/errorHandler.js'

import UrlStorageController from './controller/urlController.js'
import WriteUrlStorageService from "./service/writeUrl.js"
import ReadUrlStorageService from "./service/readUrl.js"
import UrlStorageSchema from './model/urlStorage.js'

import APIKeysController from './controller/apiKeysController.js'
import APIKeyService from './service/apiKeys.js'
import APIKeysSchema from './model/apiKeys.js'

const router = express.Router()

const mongodbString = process.env.MONGODB_URL_STRING

async function initApp(){
    const app = express()
    
    app.use(express.json())
    console.log("Initializing project")
    try{
        await mongoose.connect(mongodbString)
        console.log('Connected to database')

        const urlStorageSchema = new UrlStorageSchema(mongoose)
        const writeUrlStorageService = new WriteUrlStorageService(urlStorageSchema)
        const readUrlStorageService = new ReadUrlStorageService(urlStorageSchema)

        const urlStorageController = new UrlStorageController(writeUrlStorageService, readUrlStorageService)

        const apiKeySchema = new APIKeysSchema(mongoose)
        const apiKeyService = new APIKeyService(apiKeySchema)
        const apiKeysController = new APIKeysController(apiKeyService)

        setupUrlRoutes(router, urlStorageController, apiKeysController, apiKeyService)

        app.use('/', router)
        app.use(errorHandler)

    }catch(error){
        console.error('Error connecting to mongodb:', error)
        throw new Error('Failed to initialize app')
    }

    return app
}

export default await initApp()