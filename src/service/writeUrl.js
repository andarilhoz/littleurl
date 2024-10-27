import { customAlphabet } from 'nanoid'
import { InternalServerError } from "../errors/customErrors.js"

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const DUPLICATE_ERROR_CODE = 11000

const MAX_ATTEMPTS = 3

class WriteUrlStorageService {
    constructor(urlStorageSchema){
        this.urlStorageSchema = urlStorageSchema
        this.minUrlSize = 3
        this.nanoid = customAlphabet(alphabet, this.minUrlSize)
    }

    async createUrlStorage(targetUrl, attempt = 0){
        if(attempt >= MAX_ATTEMPTS){
            this.upgradeUrlSize()
            attempt = 0
        }
        
        try{
            const newUrlStorage = await this.urlStorageSchema.createUrlStorage({
                indexUrl: this.nanoid(),
                targetUrl: targetUrl
            })
            return newUrlStorage
        }catch(err){
            if (err.code == DUPLICATE_ERROR_CODE){
                console.warn(`Code: ${err.keyValue.indexUrl} duplicated, generating another one`)
                return this.createUrlStorage(targetUrl, ++attempt)
            }
            throw new InternalServerError(`Error creating url for: ${targetUrl}`, err)
        }
    }

    upgradeUrlSize(){
        this.minUrlSize++
        this.nanoid = customAlphabet(alphabet, this.minUrlSize)
    }
}

export default WriteUrlStorageService