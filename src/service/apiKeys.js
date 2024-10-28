import { InternalServerError, UnauthorizedError } from "../errors/customErrors.js"
import crypto from 'node:crypto'


class APIKeyService {

    constructor(apiKeySchema){
        this.apiKeySchema = apiKeySchema
    }

    async findAPIKeyByKey(key){
        try{
            const result = await this.apiKeySchema.findAPIKey(key)
            if ( result == null){
                throw new UnauthorizedError()
            }
            return result
        }catch(err){
            if ( err instanceof UnauthorizedError ){
                throw err
            }
            throw new InternalServerError(`Error finding the APIKey: ${key}`, err)
        } 
    }

    async createAPIKey(){
        try {
            const apiKey = crypto.randomBytes(16).toString('hex')
            const result = await this.apiKeySchema.createAPIKey({key: apiKey})
            return result
        } catch (err) {
            throw new InternalServerError(`Error creating new API Key`, err)
        }
    }
}

export default APIKeyService