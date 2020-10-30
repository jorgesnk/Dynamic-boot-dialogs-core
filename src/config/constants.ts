export const Constants = {
    mongoQueryConnection: process.env.MONGO_CONNECTION || 'mongodb://localhost:27017/dialogs',
    appPort: process.env.APP_PORT || 8080,
    redisHost: process.env.REDIS_HOST || 'localhost',
    redisPort: parseInt(process.env.REDIS_PORT || '0') || 6379
}