import Pino from 'pino'
export class LoggerModule {

    private logger = Pino();

    public info(message: string) {
        this.logger.info(message);
    }

    public error(message: string) {
        this.logger.error(message);
    }

    public debug(message: string) {
        this.logger.debug(message);
    }

    public warn(message:string){
        this.logger.warn(message)
    }

}