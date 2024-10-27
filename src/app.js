import express from 'express'
import mongoose from 'mongoose'

import { router, setupUrlRoutes } from './routes/urlRoutes.js'
import errorHandler from './middlewares/errorHandler.js'

async function initApp(){
    const app = express()
    app.use(express.json())

    console.log("Initializing project")
    try{
        await mongoose.connect('mongodb://root:password@localhost:27017/database?authSource=admin')
        console.log('Connected to database')

        await setupUrlRoutes(mongoose)

        app.use('/', router)
        app.use(errorHandler)

    }catch(error){
        console.error('Error connecting to mongodb:', error)
        throw new Error('Failed to initialize app')
    }

    return app
}

export default await initApp()