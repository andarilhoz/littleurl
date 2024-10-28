import { BadRequestError } from "../errors/customErrors.js"
import sanitizer from "sanitizer"

function validateInput(req, res, next){
    const targetUrl = req.body.targetUrl
    const ttlSeconds = req.body.ttlSeconds

    if(!targetUrl){
        return next(new BadRequestError('Field targetUrl is required'))
    }

    const url = sanitizer.sanitize(targetUrl)

    try{
        new URL(url)
    }catch(err){
        return next(new BadRequestError('Invalid URL'))
    }

    if(ttlSeconds != null && (!Number.isInteger(ttlSeconds) || ttlSeconds <= 0)){
        return next(new BadRequestError('ttlSeconds must be a positive int'))
    }

    req.body.targetUrl = url

    next()
}


export default validateInput
