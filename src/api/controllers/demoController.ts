import { Request,Response } from "express";
import helpers from "../helpers";

const {asyncErrorHandler} = helpers

const getDemo = asyncErrorHandler((req : Request, res: Response) => {
    res.status(200).send({msg : 'demo endpoint'})
})

export default {
    getDemo
}