import Server from "./server.js";
import config from './config.js'
import CnxMongoDB from "./model/DBMongo.js";

if(config.MODO_PERSISTENCIA == 'MONGODB') {
    await CnxMongoDB.conectar()
}

new Server(config.PORT, config.MODO_PERSISTENCIA).start()