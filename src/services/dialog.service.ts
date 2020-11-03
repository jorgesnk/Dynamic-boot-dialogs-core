import { DialogRepositoryRedisService } from '../repositories/redis/services/dialog.repository.redis.service'
import { DialogModel } from '../models/Dialog.model'
import { DialogRepositoryMongoService } from '../repositories/mongo/services/dialog.repository.mongo.service'
import { IResponse } from '../interfaces/services/IResponse'
export class DialogService {

    private dialogRepositoryRedisService = new DialogRepositoryRedisService();
    private dialogRepositoryMongoService = new DialogRepositoryMongoService();

    public async getDialog(userKey: string, dialogIntent: string): Promise<IResponse> {
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
                return { status: 200, data: dialog }
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
            return { data: dialog, status: 200 }

        } catch (e) {
            throw e;
        }


    }

    public async createDialog(dialog: DialogModel): Promise<IResponse> {
        try {
            const createdDialog = await this.dialogRepositoryMongoService.createDialog(dialog);
            return { status: 200, data: createdDialog };
        } catch (e) {
            throw e;
        }
    }

}