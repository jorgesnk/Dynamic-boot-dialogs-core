import express from 'express'
import RedisClientModule from './modules/redis/redisClient.module';
import { Constants } from './config/constants';
import { MongoConnectionModule } from './modules/mongo/mongoConnection.module';
import { DialogRoute } from './routes/dialog.route'
export class Server {
    private app = express();
    private mongoConnectionModule = new MongoConnectionModule();
    constructor() {
        RedisClientModule.start();
        this.loadMiddleware();
        this.routes();
        this.start();

    }
    private connectDataBase() {
        return this.mongoConnectionModule.connection();
    }

    private start() {
        this.app.listen(Constants.appPort, async () => {
            console.log(`app listen ${Constants.appPort}`)
            try {
                await this.connectDataBase();
                console.log('data base connected')
            } catch (e) {
                console.error(e)
                console.log('error to connect data base')
            }
        })
    }

    private routes() {
        const dialogRoutes = new DialogRoute();
        this.app.use(dialogRoutes.route);
    }
    private loadMiddleware(){
        this.app.use(express.json())
    }

}

