import RedisClienteModule from '../../../modules/redis/redisClient.module'

export class DialogRepositoryRedisService {

    public async findDialog<T>(userKey: string): Promise<T> {
        try {
            const dialog = await RedisClienteModule.get(userKey)
            return dialog ? JSON.parse(dialog) : null
        } catch (e) {
            throw e;
        }
    }

    public async setDialog<T>(userKey: string, data: T): Promise<boolean> {
        try {
            await RedisClienteModule.set(userKey, JSON.stringify(data));
            return true;
        } catch (e) {
            throw e;
        }

    }

}