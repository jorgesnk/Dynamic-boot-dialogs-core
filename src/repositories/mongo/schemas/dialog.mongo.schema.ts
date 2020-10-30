
import { Schema, model, Document, Model } from 'mongoose';
import { DialogModel } from '../../../models/Dialog.model'


export class DialogMongoSchema<T extends Document> {
    private dialogSchema = new Schema({
        triggers: [{ intent: { type: String, required: true }, _id: { type: Schema.Types.ObjectId, required: true } }],
        text: { type: String, required: true },
        intent: { type: String, required: true, unique: true }
    }, { timestamps: true })

    public dialog: Model<T> = model('Dialog', this.dialogSchema)
}


