import express from 'express'
import mongoose from 'mongoose'

import setupUrlRoutes from './routes/urlRoutes.js'
import errorHandler from './middlewares/errorHandler.js'

import UrlStorageController from './controller/urlController.js'
import WriteUrlStorageService from "./service/writeUrl.js"
import ReadUrlStorageService from "./service/readUrl.js"
import UrlStorageSchema from './model/urlStorage.js'

const router = express.Router()

async function initApp(){
    const app = express()
    app.use(express.json())

    console.log("Initializing project")
    try{
        await mongoose.connect('mongodb://root:password@localhost:27017/database?authSource=admin')
        console.log('Connected to database')

        const urlStorageSchema = new UrlStorageSchema(mongoose)
        const writeUrlStorageService = new WriteUrlStorageService(urlStorageSchema)
        const readUrlStorageService = new ReadUrlStorageService(urlStorageSchema)

        const urlStorageController = new UrlStorageController(writeUrlStorageService, readUrlStorageService)

        setupUrlRoutes(router, urlStorageController)

        app.use('/', router)
        app.use(errorHandler)

    }catch(error){
        console.error('Error connecting to mongodb:', error)
        throw new Error('Failed to initialize app')
    }

    return app
}

export default await initApp()