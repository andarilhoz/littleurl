import express from 'express'
import app from './app.js'

const port = process.env.PORT || 3000
const server = express()

server.use(app)

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})