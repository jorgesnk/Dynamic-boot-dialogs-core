import { DialogService } from '../services/dialog.service';
import { Request, Response } from 'express'
import { LoggerModule } from '../modules/logger/logger.module'
class DialogController {
    constructor() {
        this.createDialog = this.createDialog.bind(this);
        this.getDialog = this.getDialog.bind(this);
    }
    private dialogService = new DialogService();
    private logger = new LoggerModule();

    public async getDialog(req: Request, res: Response) {
        const { userKeyData, dialogIntent } = req.query;
        try {
            this.logger.info('get dialog request')
            const dialog = await this.dialogService.getDialog(userKeyData as string, dialogIntent as string);
            res.send(dialog)
        } catch (e) {
            this.logger.error(e);
            res.send(e)
        }

    }
    public async createDialog(req: Request, res: Response) {
        this.logger.info('create dialog request')
        const dialogData = req.body;
        try {
            const dialog = await this.dialogService.createDialog(dialogData);
            res.send(dialog)
        } catch (e) {
            this.logger.error(e);
        }

    }
}

export default new DialogController();