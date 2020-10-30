
import { DialogMongoSchema } from '../schemas/dialog.mongo.schema'
import { Document } from 'mongoose'
import { DialogModel } from '../../../models/Dialog.model'

interface IDialog extends Document, DialogModel { }

export class DialogRepositoryMongoService {
    private dialogMongoSchema = new DialogMongoSchema<IDialog>();

    public async findOneDialog(intent: string): Promise<IDialog | null> {
        try {
            const dialog = await this.dialogMongoSchema.dialog.findOne({ intent })
            return dialog
        } catch (e) {
            throw e
        }
    }

    public async createDialog(dialog: DialogModel) {
        return this.dialogMongoSchema.dialog.create(dialog)

    }

}