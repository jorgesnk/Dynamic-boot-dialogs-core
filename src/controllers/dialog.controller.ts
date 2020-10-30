import { DialogService } from '../services/dialog.service';
import { Request, Response } from 'express'

class DialogController {
    constructor() {
        this.createDialog = this.createDialog.bind(this);
        this.getDialog = this.getDialog.bind(this);
    }
    private dialogService = new DialogService();
    public async getDialog(req: Request, res: Response) {
        const { userKeyData, dialogIntent } = req.query;
        try {
            const dialog = await this.dialogService.getDialog(userKeyData as string, dialogIntent as string);
            res.send(dialog)
        } catch (e) {
            console.log(e)
            res.send(e)
        }

    }
    public async createDialog(req: Request, res: Response) {
        const dialogData = req.body;
        const dialog = await this.dialogService.createDialog(dialogData);
        res.send(dialog)
    }
}

export default new DialogController();