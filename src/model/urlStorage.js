class UrlStorageSchema {
    constructor(mongoose) {
        const Schema = mongoose.Schema

        const urlStorageSchema = new Schema({
            indexUrl: {type: String, required: true, unique: true},
            targetUrl: {type: String, required: true},
            createdAt: {type: Date, default: Date.now},
            expireAt: {type: Date, default: null}
        })

        urlStorageSchema.index({expireAt: 1}, {expireAfterSeconds: 0})

        this.model = mongoose.model("UrlStorage", urlStorageSchema)
    }

    createUrlStorage(data){
        const urlStorage = new this.model(data)
        return urlStorage.save()
    }

    findUrlStorage(indexUrl){
        return this.model.findOne({indexUrl})
    }
}

export default UrlStorageSchema