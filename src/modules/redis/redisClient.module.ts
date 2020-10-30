import { createClient } from 'redis';
import { Constants } from '../../config/constants';
class RedisClientModule {
    public client = createClient(Constants.redisPort, Constants.redisHost);

    constructor() {
        this.client.on('error', (error) => {
            console.log("error redis")
            console.log(error)
        })
    }

    public start() {
        console.log('redis started');
    }

    public get(userKey: string): Promise<string | null> {
        return new Promise((resolve, reject) => {
            this.client.get(userKey, (error, data) => {
                if (error) {
                    reject(error);
                    return
                }
                resolve(data)
            })
        })
    }


    public set(userKey: string, data: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.client.set(userKey, data, (error, dataReturn) => {
                if (error) {
                    reject(error);
                    return
                }
                resolve(dataReturn);
            })
        })
    }

}

export default new RedisClientModule();