import express,{Express,Request,Response } from "express";
import cors,{CorsOptions} from 'cors';
import config from "./config/config";
import morgan from "./config/morgan";
import routes from './api/routes';

const options : CorsOptions = {
    origin : config.client_url
}

const appLoader = async (app : Express) => {
    app.get('/',(req : Request,res : Response) => {
        res.status(200).end();
    })

    app.head('/',(req : Request,res : Response) => {
        res.status(200).end();
    })

    if(config.mode != 'test'){
        app.use(morgan.successHandler)
        app.use(morgan.errorHandler)
    }
    
    app.use(express.json())
    app.use(cors(options))
    app.use(express.urlencoded({extended : true}))

    app.use('/',routes.demoRoute)
}

export default appLoader
