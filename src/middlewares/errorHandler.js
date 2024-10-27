import {CustomError} from "../errors/customErrors.js"

function errorHandler(err, req, res, next){
    if ( err instanceof CustomError) {
        return res.status(err.statusCode).json({message: err.message})
    }

    console.error(`Unexpected Error stack: ${err.stack}`, err) 
    return res.status(500).json({message: "Unexpected Error", error})
}

export default errorHandler