import express from "express"
import app from "./app.js"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const port = process.env.PORT || 3000
const server = express()

server.use(express.static(path.join(__dirname, "public")))

server.use(app)

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})
