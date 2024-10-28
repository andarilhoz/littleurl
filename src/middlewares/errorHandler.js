import {CustomError} from "../errors/customErrors.js"

function errorHandler(err, req, res, next){
    if ( err instanceof CustomError) {
        return res.status(err.statusCode).json({message: err.message})
    }

    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error(err);
        return res.status(400).json({ message: err.message })
    }

    console.error(`Unexpected Error stack: ${err.stack}`, err) 
    return res.status(500).json({message: "Unexpected Error", error: err})
}

export default errorHandler