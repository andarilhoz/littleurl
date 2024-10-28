class APIKeysSchema {
    constructor(mongoose) {
        const Schema = mongoose.Schema

        const apiKeysSchema = new Schema({
            key: {type: String, required: true, unique: true},
            createdAt: {type: Date, default: Date.now}
        })

        this.model = mongoose.model("APIKeys", apiKeysSchema)
    }

    createAPIKey(data){
        const apiKey = new this.model(data)
        return apiKey.save()
    }

    findAPIKey(key){
        return this.model.findOne({key})
    }
}

export default APIKeysSchema