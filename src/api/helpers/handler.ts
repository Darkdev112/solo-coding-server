import { NextFunction, Request,Response } from "express"

type FuncType = (req : Request,res : Response, next?: NextFunction) => Promise<void>

const asyncErrorHandler = (func : FuncType) => {
    return (req:Request,res:Response,next:NextFunction) => {
        func(req,res,next).catch((error : Error) => next(error))
    }
}

export default asyncErrorHandler