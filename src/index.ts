import express from "express";
import appLoader from "./app";
import config from "./config/config";
import logger from "./config/logger";

const startServer = async () => {
    const app = express()
    await appLoader(app)

    const server = app.listen(config.port,() => {
        logger.info(`Server up on port ${config.port}`);
    })

    const unexpectedErrorHandler = async(error : Error) => {
        logger.error(error)
        if(server){
            server.close(() => {
                logger.info("Server closed")
                process.exit(1)
            })
        }
        else{
            process.exit(1)
        }
    }

    process.on('uncaughtException',unexpectedErrorHandler)
    process.on('uncaughtRejection',unexpectedErrorHandler)
    process.on("SIGTERM", unexpectedErrorHandler)
    process.on("SIGINT", unexpectedErrorHandler)
}

startServer()

