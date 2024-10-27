class UrlStorageController {
    constructor(writeUrlStorageService, readUrlStorageService){
        this.writeUrlStorageService = writeUrlStorageService
        this.readUrlStorageService = readUrlStorageService

        this.createUrlStorage = this.createUrlStorage.bind(this)
        this.getUrlStorage = this.getUrlStorage.bind(this)
    }

    async createUrlStorage(req, res, next){
        try{
            const targetUrl = req.body.targetUrl
            const newUrlStorage = await this.writeUrlStorageService.createUrlStorage(targetUrl)

            res.status(201).json({message: `http://localhost:3000/${newUrlStorage.indexUrl}`})
        }catch(error){
            next(error)
        }
    }

    async getUrlStorage(req, res, next){
        try{
            const indexUrl = req.params.indexUrl
            const result = await this.readUrlStorageService.findUrlByIndex(indexUrl)
            res.setHeader('Location', result.targetUrl).sendStatus(307)
        }catch(error){
            next(error)
        }
    }
}

export default UrlStorageController