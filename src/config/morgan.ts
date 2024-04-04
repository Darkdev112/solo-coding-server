import morgan from 'morgan'
import { Request,Response } from 'express';
import config from "./config";
import logger from "./logger";

morgan.token("message", (req : Request, res : Response) : string => res.statusMessage || "");

const getIpFormat = config.mode === "production" ? ":remote-addr - " : "";

const successResponseFormat = `${getIpFormat}:method :url :status - :response-time ms`;

const errorResponseFormat = `${getIpFormat}:method :url :status - :response-time ms - message: :message`;

const successHandler = morgan(successResponseFormat, {
	skip: (req : Request, res : Response) => res.statusCode >= 400,
	stream: { write: (message) => logger.info(message.trim()) },
});

const errorHandler = morgan(errorResponseFormat, {
	skip: (req : Request, res : Response) => res.statusCode < 400,
	stream: { write: (message) => logger.error(message.trim()) },
});

export default {
    successHandler,
    errorHandler
}

