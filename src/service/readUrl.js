import { InternalServerError, NotFoundError } from "../errors/customErrors.js"

class ReadUrlStorageService {

    constructor(urlStorageSchema){
        this.urlStorageSchema = urlStorageSchema
    }

    async findUrlByIndex(indexUrl){
        try{
            var result = await this.urlStorageSchema.findUrlStorage(indexUrl)
            if ( result == null){
                throw new NotFoundError()
            }
            return result
        }catch(err){
            if ( err instanceof NotFoundError ){
                throw err
            }
            throw new InternalServerError(`Error finding the url: ${indexUrl}`, err)
        } 
    }
}

export default ReadUrlStorageService