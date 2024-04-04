import path from 'path'
import dotenv from 'dotenv'

const env = dotenv.config({path : path.join(__dirname,'../../.env')})

if(env.error){
    throw new Error('No .env file found')
}

export default {
    mode : process.env.NODE_ENV,
    port : process.env.PORT,
    client_url : process.env.CLIENT_URL
}

