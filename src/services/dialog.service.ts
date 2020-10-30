import { DialogRepositoryRedisService } from '../repositories/redis/services/dialog.repository.redis.service'
import { DialogModel } from '../models/Dialog.model'
import { DialogRepositoryMongoService } from '../repositories/mongo/services/dialog.repository.mongo.service'
export class DialogService {

    private dialogRepositoryRedisService = new DialogRepositoryRedisService();
    private dialogRepositoryMongoService = new DialogRepositoryMongoService();

    public async getDialog(userKey: string, dialogIntent: string): Promise<string> {

        try {
            const cacheDialog = await this.dialogRepositoryRedisService.findDialog<DialogModel>(userKey);
            if (!cacheDialog) {
                const dialog = await this.dialogRepositoryMongoService.findOneDialog(dialogIntent);
                if (!dialog) {
                    throw new Error('dialog not found')
                }
                await this.dialogRepositoryRedisService.setDialog<DialogModel>(userKey,
                    {
                        text: dialog.text,
                        intent: dialog.intent,
                        triggers: dialog.triggers
                    })
                return dialog.text
            }
            
            const dialog = await this.dialogRepositoryMongoService.findOneDialog(cacheDialog.intent);
            if (!dialog) {
                throw new Error('dialog not found')
            }
            await this.dialogRepositoryRedisService.setDialog<DialogModel>(userKey,
                {
                    text: dialog.text,
                    intent: dialog.intent,
                    triggers: dialog.triggers
                })
            return dialog.text


        } catch (e) {
            throw e;
        }


    }

    public async createDialog(dialog: DialogModel): Promise<boolean> {
        try {
            await this.dialogRepositoryMongoService.createDialog(dialog);
            return true;
        } catch (e) {
            throw e;
        }
    }

}