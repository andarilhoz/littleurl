import express from 'express'
import app from './app.js'
import path from 'path'
import { fileURLToPath } from 'url'

// Obter o nome do arquivo atual
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const port = process.env.PORT || 3000
const server = express()

// Middleware para servir arquivos estáticos da pasta 'public'
server.use(express.static(path.join(__dirname, 'public')))

// Usar o app principal com rotas da aplicação
server.use(app)

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
