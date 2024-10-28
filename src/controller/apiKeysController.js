class APIKeysController {
    constructor(apiKeysService){
        this.apiKeysService = apiKeysService

        this.createAPIKey = this.createAPIKey.bind(this)
    }

    async createAPIKey(req, res, next){
        try{
            const apiKey = await this.apiKeysService.createAPIKey()
            res.status(201).json({message: `APIKey:${apiKey.key}`})
        }catch(error){
            next(error)
        }
    }
}

export default APIKeysController