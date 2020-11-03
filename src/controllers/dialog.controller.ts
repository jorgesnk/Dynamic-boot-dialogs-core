import { DialogService } from '../services/dialog.service';
import { Request, Response } from 'express'
import { LoggerModule } from '../modules/logger/logger.module'
import { ValidatorModule } from '../modules/validators/validator.module'
import { IJsonSchema } from '../modules/validators/interfaces/IJsonSchema'
import { EJsonSchemaTypes } from '../modules/validators/enums/EJsonSchema'
class DialogController {
    constructor() {
        this.createDialog = this.createDialog.bind(this);
        this.getDialog = this.getDialog.bind(this);
    }
    private dialogService = new DialogService();
    private logger = new LoggerModule();
    private validatorModule = new ValidatorModule();
    public async getDialog(req: Request, res: Response) {
        const { userKeyData, dialogIntent } = req.query;
        const schemaQuery: IJsonSchema = {
            type: EJsonSchemaTypes.OBJECT,
            additionalProperties: false,
            properties: {
                userKeyData: {
                    type: EJsonSchemaTypes.STRING
                },
                dialogIntent: {
                    type: EJsonSchemaTypes.STRING
                }

            },
            required: ['userKeyData', 'dialogIntent']
        }
        try {
            const validateQuery = await this.validatorModule.validateSchema(schemaQuery, { userKeyData, dialogIntent })
            if (!validateQuery.isValid) {
                this.logger.error(`validate error ${validateQuery.error}`)
                return res.status(422).send({ error: validateQuery.error });
            }
            console.log(validateQuery, dialogIntent)
            this.logger.info('get dialog request')
            const dialog = await this.dialogService.getDialog(userKeyData as string, dialogIntent as string);
            res.status(dialog.status).send(dialog.data)
        } catch (e) {
            this.logger.error(e);
            res.status(e?.status | 400).send(e)
        }

    }
    public async createDialog(req: Request, res: Response) {
        this.logger.info('create dialog request')
        const dialogData = req.body;
        const schemaDialogData: IJsonSchema = {
            type: EJsonSchemaTypes.OBJECT,
            additionalProperties: false,
            properties: {
                triggers: {
                    type: EJsonSchemaTypes.ARRAY,
                    items: {
                        type: EJsonSchemaTypes.OBJECT,
                        properties: {
                            intent: {
                                type: EJsonSchemaTypes.STRING,
                            },
                            dialogId: {
                                type: EJsonSchemaTypes.STRING
                            },
                        },
                        required: ['intent', 'dialogId']
                    },
                },
                text: {
                    type: EJsonSchemaTypes.STRING
                },
                intent: {
                    type: EJsonSchemaTypes.STRING
                }

            },
            required: ['triggers', 'text', 'intent']
        }
        try {
            const validateData = await this.validatorModule.validateSchema(schemaDialogData, dialogData)
            if (!validateData.isValid) {
                this.logger.error(`validate error ${validateData.error}`)
                return res.status(422).send({ error: validateData.error });
            }
            const dialog = await this.dialogService.createDialog(dialogData);
            res.status(dialog.status).send(dialog.data)
        } catch (e) {
            this.logger.error(e);
            res.status(e?.status | 400).send(e)
        }

    }
}

export default new DialogController();